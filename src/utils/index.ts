export function formatCurrency(amount:number){
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        currencyDisplay:'narrowSymbol'
    }).format(amount)
}

export function getImagePath(imagePath: string) {
    // If it's already a full URL (http/https), return as-is
    if(imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}
