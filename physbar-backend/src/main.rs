#[macro_use] extern crate rocket;

use std::{collections::HashMap, fs::File};

use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::{Header, Method, Status};
use rocket::{Error, Request, Response, State};
use rocket::serde::json::Json;
pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, request: &'r Request<'_>, response: &mut Response<'r>) {
        if request.method() == Method::Options {
            response.set_status(Status::NoContent);
            response.set_header(Header::new(
                "Access-Control-Allow-Methods",
                "POST, PATCH, GET, DELETE",
            ));
            response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        }

        response.set_header(Header::new(
            "Access-Control-Allow-Origin",
            "http://localhost:3000",
        ));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[get("/api/drinks")]
fn drinks(drinks: &State<HashMap<String, Drink>>) -> Json<&HashMap<String, Drink>> {
    Json(drinks)
}

#[get("/api/drinks/<name>")]
fn drink(drinks: &State<HashMap<String, Drink>>, name: String) -> Option<Json<&Drink>> {
    let drink = drinks.get(&name);
    match drink {
        Some(drink) => Some(Json(drink)),
        None => None,
    }
}

#[get("/api/extras")]
fn extras(extras: &State<HashMap<String, Extra>>) -> Json<&HashMap<String, Extra>> {
    Json(extras)
}


#[derive(serde::Deserialize, serde::Serialize)]
struct Drink {
    name: String,
    base_price: f32,
    multiple: bool,
    variants: HashMap<String, f32>,
}

#[derive(serde::Deserialize, serde::Serialize)]
struct Extra {
    name: String,
    price: f32,
}

#[launch]
fn rocket() -> _ {
    let file = File::open("drinks.json").expect("No drinks.json file found");
    let drinks: HashMap<String, Drink> = serde_json::from_reader(file).expect("corrupt drinks.json");

    let file = File::open("extras.json").expect("No extras.json file found");
    let extras: HashMap<String, Extra> = serde_json::from_reader(file).expect("corrupt extras.json");

    rocket::build().mount("/", routes![drinks, drink, extras]).manage(drinks).manage(extras).attach(CORS)
}