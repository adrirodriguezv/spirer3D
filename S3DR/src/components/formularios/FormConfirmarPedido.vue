<script setup>
import { useFormStore } from '../../store/store'; // Importa el store de Pinia
import { ref, onMounted } from 'vue';
import emailjs from 'emailjs-com';

// Crear una instancia del store
const store = useFormStore();


const nombre = ref("");  // Campo de nombre
const apellidos = ref("");  // Campo de apellidos
const email = ref("");  // Campo de email
const direccion = ref("");  // Campo de dirección
const ciudad = ref("");  // Campo de ciudad
const codigoPostal = ref("");  // Campo de código postal

let autocomplete;

// Reemplaza con tu Merchant ID
const MERCHANT_ID = 'BCR2DN4T27N7H6YQ';

const createPaymentDataRequest = () => {
    const precio = store.precioProducto;
    return {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
            {
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                        gateway: 'example', // Cambia esto por el gateway que estás utilizando
                        gatewayMerchantId: 'gateway-merchant-id', // El ID del comerciante de tu gateway
                    },
                },
            },
        ],
        merchantInfo: {
            merchantId: MERCHANT_ID,
            merchantName: 'Nombre del comerciante',
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: precio.toString(), // El precio total de la transacción
            currencyCode: 'EUR', // El código de la moneda (por ejemplo, 'USD', 'EUR')
        },
    };
};


const enviarCorreo = () => {
  const templateParams = {
    nombre: nombre.value,
    apellidos: apellidos.value,
    email: email.value,
    direccion: direccion.value,
    ciudad: ciudad.value,
    codigoPostal: codigoPostal.value,
    producto: store.productoSeleccionado,
    precio: store.precioProducto,
    tamaño: store.tamaño,
    altura: store.altura,
    anchura: store.anchura,
    profundidad: store.profundidad,
    material: store.material,
    color: store.color,
    comentarios: store.comments,
  };

  // Enviar correo usando EmailJS
  emailjs.send('service_kolvt2e', 'template_o6vcblr', templateParams, '0z3N1h964PbVdv6r2')
    .then(async (response) => {
      console.log('Correo enviado con éxito:', response);
      alert('Correo enviado con éxito');

      // Aquí hacemos el POST para insertar el pedido en la base de datos
      try {
        const pedidoData = {
          usuarioId: store.usuarioId, // ID del usuario que realizó el pedido
          productoId: store.productoId, // ID del producto comprado
          metodoPago: store.metodoPago, // Método de pago
        };

        // Llamada a la API para crear el pedido en la base de datos
        const pedidoResponse = await axios.post('http://localhost:3000/api/pedidos/crear-pedido', pedidoData);
        console.log('Pedido creado:', pedidoResponse.data);
      } catch (error) {
        console.error('Error al crear el pedido:', error);
        alert('Hubo un problema al procesar tu pedido');
      }
    })
    .catch((error) => {
      console.error('Error al enviar el correo:', error);
      alert('Error al enviar el correo');
    });
};


onMounted(() => {
    // Inicializar el autocompletado de la dirección
    const input = document.getElementById('autocomplete');

    // Inicializar Google Places Autocomplete
    autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'es' },  // Limitar a España
        fields: ['address_components', 'geometry'],
        types: ['address'],
    });

    // Listener para el evento place_changed
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log(place); // Aquí puedes trabajar con la información del lugar seleccionado

        // Extraer la ciudad y asignarla al campo ciudad
        place.address_components.forEach(component => {
            if (component.types.includes("locality")) {
                ciudad.value = component.long_name;  // Asignar la ciudad
            }
            if (component.types.includes("postal_code")) {
                codigoPostal.value = component.long_name;  // Asignar el código postal
            }
        });

        // Asignar la dirección seleccionada al campo "direccion"
        if (place.formatted_address) {
            direccion.value = place.formatted_address;
        }
    });


    // Crear el botón de PayPal
    if (window.paypal) {
        window.paypal.Buttons({
            createOrder(data, actions) {
                // Obtener el precio desde el store
                const precio = store.precioProducto;

                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: precio.toString(), // Aseguramos que sea una cadena
                        },
                    }],
                });
            },
            onApprove(data, actions) {
                return actions.order.capture().then(function (details) {
                    alert('Pago realizado con éxito: ' + details.payer.name.given_name);

                    // Enviar el correo con los detalles del pedido
                    enviarCorreo();  // Aquí se llama a la función de EmailJS

                    // Redirigir o hacer lo que sea necesario después de completar el pago
                });
            },
        }).render('#paypal-button-container');
    }


    // Cargar el objeto de Google Pay
    const paymentsClient = new google.payments.api.PaymentsClient({
        environment: 'TEST', // Usa 'PRODUCTION' en un entorno de producción
    });

    const paymentDataRequest = createPaymentDataRequest();

    const button = paymentsClient.createButton({
        onClick: () => {
            paymentsClient.loadPaymentData(paymentDataRequest)
                .then((paymentData) => {
                    // Maneja el pago exitoso
                    console.log('Pago exitoso', paymentData);
                })
                .catch((error) => {
                    // Maneja los errores
                    console.error('Error en Google Pay', error);
                });
        },
    });

    document.getElementById('google-pay-button').appendChild(button);


    const onApprove = () => {
        // Llamar a la función para enviar el correo con los detalles del pedido
        enviarCorreo();
    };

});

</script>

<template>
    <section class="container">
        <div class="datos-personales">
            <form @submit.prevent="enviarCorreo">
                <h2>Datos Personales</h2>
                <label>Nombre</label>
                <input type="text" v-model="nombre" required />

                <label>Apellidos</label>
                <input type="text" v-model="apellidos" required />

                <label>Correo Electrónico</label>
                <input type="email" v-model="email" required />

                <label for="autocomplete">Dirección:</label>
                <!-- Aquí aseguramos que la dirección seleccionada se muestre en el input -->
                <input id="autocomplete" type="text" v-model="direccion" placeholder="Introduce tu dirección"
                    required />

                <!-- Ciudad autocompletada -->
                <label>Ciudad</label>
                <input type="text" v-model="ciudad" placeholder="Ciudad" required disabled />

                <!-- Código Postal autocompletado -->
                <label>Código Postal</label>
                <input type="text" v-model="codigoPostal" placeholder="Código Postal" required disabled />

                <button type="submit">Guardar y continuar</button>

            </form>
        </div>

        <div class="pago">
            <h2>Pago</h2>
            <div class="buttons-pay">
                <!-- Botón de PayPal -->
                <div id="paypal-button-container"></div>
                <div id="google-pay-button"></div>
            </div>
        </div>

        <div class="linea-vertical"></div>

        <div class="cesta">
            <div class="intro">
                <img src="../../assets/img/pedido.png" alt="Pedido">
                <h2>Mi Pedido</h2>
            </div>
            <img :src="`../../../../backend/uploads/imgs/${store.imagen}`">
            <!-- Mostrar los detalles del pedido desde el store -->
            <p><strong>Producto:</strong> {{ store.productoSeleccionado }}</p>

            <!-- Si el producto seleccionado tiene un nombre adicional, mostrarlo -->
            <div v-if="store.productoSeleccionado === 'Llavero nombre'">
                <p><strong>Nombre para el llavero:</strong> {{ store.objectName }}</p>
            </div>

            <!-- Si el producto seleccionado es un código QR, mostrar el texto del QR -->
            <div v-if="store.productoSeleccionado === 'Código QR'">
                <p><strong>Texto para el código QR:</strong> {{ store.textoQR }}</p>
            </div>

            <p><strong>Tamaño:</strong> {{ store.tamanyo }}</p>
            <p><strong>Altura:</strong> {{ store.altura }} cm</p>
            <p><strong>Anchura:</strong> {{ store.anchura }} cm</p>
            <p><strong>Profundidad:</strong> {{ store.profundidad }} cm</p>
            <p><strong>Material:</strong> {{ store.material }}</p>
            <p><strong>Color:</strong> {{ store.color }}</p>
            <p><strong>Comentarios:</strong> {{ store.comments }}</p>

            <!-- Mostrar el precio aquí -->
            <p><strong class="precio">{{ store.precioProducto }} €</strong></p>
            <!-- Mostramos el precio desde el store -->
        </div>
    </section>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    margin-top: 10%;
    margin-bottom: 10%;
}

form {
    width: 45%;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-right: 4%;
}

input {
    width: 100%;
    border: none;
    padding: 1%;
    border-radius: 10px;
    border: 2px white solid;
    background-color: transparent;
}

input:focus {
    border: 1px white solid;
}

button {
    width: 102.5%;
    padding: 2%;
    border-radius: 50px;
    color: white;
    border: none;
    background-color: #54545472;
    margin-top: 2%;
    transition: 0.3s;
}

button:hover {
    background-color: #545454bd;
}

.linea-vertical {
    width: 1px;
    height: 700px;
    background-color: #5454546b;
}

.cesta {
    width: 30%;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
    margin-left: 4%;
}

.cesta p {
    margin-top: 4%;
}

.cesta strong {
    font-weight: 550;
}

.intro {
    display: flex;
    align-items: center;
}

.cesta img {
    width: 10%;
}

.precio {
    font-size: 200%;
}

.datos-personales {
    width: 60%;
    margin-left: 10%;
}

.pago {
    width: 20%;
    margin-right: 10%;
}

.buttons-pay {
    margin-top: 10%;
}
</style>
