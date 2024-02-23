import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from "@mui/material/Button";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from "@mui/material";

import CartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";

import axios from '../axios/axiosConfig';
import { Drink } from "../types";

export default function Menu({drinks}: {drinks: Record<string, Drink>}) {
    return (
        <Container style={{padding: '0', margin: '0'}}>
            <div style={{padding: '3%', alignContent: 'center', justifyContent: 'center'}}>
                <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                    {Object.entries(drinks).reverse().map(([_, drink]) => {
                        return (
                            <Grid item key={drink.name} xs={6} style={{justifyContent: 'center', textAlign: 'center'}}>
                                <Card >
                                    <div style={{ margin: '5%' }}>
                                        <h2 style={{margin: '0%'}}>{drink.name}</h2>
                                        <p style={{margin: '0%'}}>Price: £{drink.base_price.toFixed(2)}</p>
                                        
                                        <FormControl>
                                        {drink.multiple ? 
                                            <div>
                                                {Object.entries(drink.variants).map(([variant, price]) => {
                                                let priceLabel = price > 0 ? `+£${price.toFixed(2)}` : "";
                                                return (
                                                    <FormControlLabel key={variant} control={<Checkbox />} label={`${variant} ${priceLabel}`}/>
                                                );
                                                })}
                                            </div>
                                            :
                                            <div>
                                                <RadioGroup defaultValue={Object.keys(drink.variants)[0]}>
                                                    {Object.entries(drink.variants).map(([variant, price]) => {
                                                    let priceLabel = price > 0 ? `+£${price.toFixed(2)}` : "";
                                                    return (
                                                        <FormControlLabel key={variant} control={<Radio value={variant}/>} label={`${variant} ${priceLabel}`}/>
                                                    );
                                                    })}
                                                </RadioGroup>
                                            </div>
                                        }
                                            <Button variant="contained" endIcon={<CartIcon />}>
                                                Buy
                                            </Button>
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