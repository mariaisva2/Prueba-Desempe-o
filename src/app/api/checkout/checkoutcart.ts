export const checkout = async (items: any[], totalPrice: number, onRemoveItem: (id: number) => void) => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    if (!token) {
      throw new Error('No se encontró el token. Por favor inicie sesión nuevamente.');
    }

    const products = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const response = await fetch('http://192.168.88.39:7000/auth/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products,
        totalItems: items.length,
        priceTotal: totalPrice,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el checkout');
    }

  
    items.forEach(item => onRemoveItem(item.id));


    return '¡Venta realizada correctamente!'; 

  } catch (error) {
    throw error instanceof Error ? error : new Error('Error desconocido');
  }
};
