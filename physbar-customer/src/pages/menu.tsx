import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from "@mui/material";

const drinks = {
    espresso: {
        name: "Espresso",
        basePrice: 0.4,
        variants: {"Single": 0, "Double": 0.1},
        multiple: false
    },

    americano: {
        name: "Americano",
        basePrice: 0.4,
        variants: {"Single": 0, "Double": 0.1},
        multiple: false
    },

    latte: {
        name: "Latte",
        basePrice: 0.6,
        variants: {"Single": 0, "Double": 0.2,},
        multiple: false
    },

    cappuccino: {
        name: "Cappuccino",
        basePrice: 0.6,
        variants: {"Single": 0, "Double": 0.2},
        multiple: false
    },

    iced_latte: {
        name: "Iced Latte",
        basePrice: 0.6,
        variants: {"Single": 0, "Double": 0.2},
        multiple: false
    },

    flat_white: {
        name: "Flat White",
        basePrice: 0.7,
        variants: {"Single": 0, "Double": 0.2},
        multiple: false
    },
    
    mocha: {
        name: "Mocha",
        basePrice: 0.7,
        variants: {"Single": 0, "Double": 0.2},
        multiple: false
    },

    dirty_chai: {
        name: "Dirty Chai",
        basePrice: 0.7,
        variants: {"Single": 0, "Double": 0.2},
        multiple: false
    },

    tea: {
        name: "Tea",
        basePrice: 0.15,
        variants: {"PG Tips": 0.0, "Earl Grey": 0.0, "Green": 0.0, "Herbal": 0.0},
        multiple: false
    },

    hot_choc: {
        name: "Hot Choc",
        basePrice: 0.5,
        variants: {"Cream": 0.05, "Marshmallows": 0.05},
        multiple: true
    }
}

export default function Menu() {
    return (
        <Container style={{padding: '0', margin: '0'}}>
            <div style={{padding: '3%', alignContent: 'center', justifyContent: 'center'}}>
                <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                    {Object.entries(drinks).map(([_, drink]) => {
                        return (
                            <Grid item key={drink.name} xs={6} style={{justifyContent: 'center', textAlign: 'center'}}>
                                <Card>
                                    <div style={{ margin: '5%' }}>
                                        <h2 style={{margin: '0%'}}>{drink.name}</h2>
                                        <p style={{margin: '0%'}}>Price: £{drink.basePrice}</p>
                                        
                                        <FormControl>
                                        {drink.multiple ? 
                                            <div>
                                                {Object.entries(drink.variants).map(([variant, price]) => {
                                                let priceLabel = price > 0 ? `+£${price}` : "";
                                                return (
                                                    <FormControlLabel control={<Checkbox />} label={`${variant} ${priceLabel}`}/>
                                                );
                                                })}
                                            </div>
                                            :
                                            <div>
                                                <RadioGroup defaultValue={Object.keys(drink.variants)[0]}>
                                                    {Object.entries(drink.variants).map(([variant, price]) => {
                                                    let priceLabel = price > 0 ? `+£${price}` : "";
                                                    return (
                                                        <FormControlLabel control={<Radio value={variant}/>} label={`${variant} ${priceLabel}`}/>
                                                    );
                                                    })}
                                                </RadioGroup>
                                            </div>
                                        }

                                        </FormControl>
                                    </div>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </Container>
    );
}