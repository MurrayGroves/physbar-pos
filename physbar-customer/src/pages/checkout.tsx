import { Card, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Drink, SelectedDrink } from "../types";

export default function Checkout({selectedDrink}: {selectedDrink: SelectedDrink | null}) {
    let total = selectedDrink ? selectedDrink.drink.base_price : 0;

    return (
        <Container>
            <h1>Checkout</h1>
            <Card>
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
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </Container>
    )
    }