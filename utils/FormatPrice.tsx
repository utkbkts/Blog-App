export function FormatPrice(price:number){
    return(price).toLocaleString("en-US",{
        style:"currency",
        currency:"USD"
    })
}