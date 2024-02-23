import { Alert, Button, Card, Checkbox, Container, FormControlLabel, Grid, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Drink, ExtraItem, SelectedDrink } from "../types";
import { useEffect, useState } from "react";

import CartIcon from '@mui/icons-material/ShoppingCart';

import axios from '../axios/axiosConfig';

export default function Checkout({selectedDrink}: {selectedDrink: SelectedDrink | null}) {
    const [selectedExtras, setSelectedExtras] = useState<ExtraItem[]>([]);
    const [extras, setExtras] = useState<Record<string, ExtraItem>>({});
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    useEffect(() => {
        axios.get("/extras").then((response) => {
            setExtras(response.data);
        })
    }, [])

    let total = selectedDrink ? selectedDrink.drink.base_price : 0;

    return (
        <Container>
            <h1>Checkout</h1>
            <Card style={{marginBottom: '5%'}}>
                <div style={{paddingLeft: '3%'}}>
                    <h2>Extras</h2>
                    {Object.entries(extras).map(([id, extra]) => {
                        let priceLabel = extra.price > 0 ? `+£${extra.price.toFixed(2)}` : "";
                        return (
                            <FormControlLabel key={id} control={<Checkbox />} label={`${extra.name} ${priceLabel}`} onChange={(_, checked) => {
                                if (checked) {
                                    setSelectedExtras([...selectedExtras, extra]);
                                } else {
                                    setSelectedExtras(selectedExtras.filter((v) => v !== extra));
                                }
                            }}/>
                        )
                    })}
                </div>
            </Card>

            <Card style={{marginBottom: '5%'}}>
                <div>
                    <h2 style={{paddingLeft: '3%'}}>Total</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{selectedDrink?.drink.name}</TableCell>
                                <TableCell>£{selectedDrink?.drink.base_price.toFixed(2)}</TableCell>
                                <TableCell>£{selectedDrink?.drink.base_price.toFixed(2)}</TableCell>
                            </TableRow>
                            {
                                selectedDrink?.variants.map((variant) => {
                                    total = total + selectedDrink?.drink.variants[variant];
                                    return (
                                        <TableRow key={variant}>
                                            <TableCell>+ {variant}</TableCell>
                                            <TableCell>£{selectedDrink?.drink.variants[variant].toFixed(2)}</TableCell>
                                            <TableCell>£{total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            {
                                selectedExtras.map((extra) => {
                                    total = total + extra.price;
                                    return (
                                        <TableRow key={extra.name}>
                                            <TableCell>{extra.name}</TableCell>
                                            <TableCell>£{extra.price.toFixed(2)}</TableCell>
                                            <TableCell>£{total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <Card>
                <div style={{padding: '3%'}}>
                    <h2 style={{marginTop: 0}}>Payment</h2>
                    {
                        orderSubmitted ? <Alert variant="outlined" severity="success" style={{marginBottom: '5%'}}>
                            Order submitted!
                        </Alert> : null
                    }
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button style={{width: '100%'}} variant="contained" endIcon={<CartIcon/>} onClick={() => {
                                if (orderSubmitted) return;
                                setOrderSubmitted(true);
                            }}>Cash</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button style={{width: '100%'}} variant="contained" endIcon={<CartIcon />} onClick={() => {
                                if (orderSubmitted) return;
                                setOrderSubmitted(true);
                                setTimeout(() => {window.location.href = `https://www.paypal.com/paypalme/physbar/${total}`}, 1500);
                            }}>
                                PayPal
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </Container>
    )
    }