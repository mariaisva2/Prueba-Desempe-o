
import { IProduct } from '@/Interface/ProductsCard';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const response = await fetch('http://192.168.88.39:7000/auth/products');
        
        if (!response.ok) {
            return NextResponse.json({ message: 'Error al obtener los productos' }, { status: response.status });
        }
        const products: IProduct[] = await response.json();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}
