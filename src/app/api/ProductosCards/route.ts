import { IProduct } from '@/Interface/ProductsCard';
import error from 'next/error';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function GET() {
    
        const cookieStore = cookies();

        const accesstoken = cookieStore.get('access_token')?.value;

        if (!accesstoken) {
            return NextResponse.json({ message: 'No hay un token de acceso en las cookies' }, { status: 401 });
        }
        try {
        const response = await fetch('http://192.168.88.39:7000/auth/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accesstoken}`, 
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error details:', error);  
            return NextResponse.json({ message: 'Error al obtener los productos', details: errorData }, { status: response.status });
        }

        const products: IProduct[] = await response.json();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'Error del servidor' }, { status: 500 });
    }
}


