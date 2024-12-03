interface IProducts{
    status: string,
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: {
        products: [
            {
                _id: string,
                category: string,
                subcategory: string,
                name: string,
                price: number,
                quantity: number,
                brand: string ,
                thumbnail: string,
                images: [
                    string
                ],
                slugname:string
            },
        ]
    }
}