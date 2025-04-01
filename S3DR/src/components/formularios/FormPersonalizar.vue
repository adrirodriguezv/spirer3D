<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useFormStore } from '../../store/store';
import { useAuthStore } from '../../store/authStore';  // Importa el store de autenticación

const productoSeleccionado = ref("");
const productos = ref([]);
const precioProducto = ref(0);

const store = useFormStore();
const router = useRouter();
const authStore = useAuthStore(); // Obtener el estado de autenticación

const objectName = ref("");
const altura = ref(0);
const anchura = ref(0);
const profundidad = ref(0);
const material = ref("");
const color = ref("");
const comments = ref("");
const textoQR = ref("");
const tamaño = ref("");  // Campo para el tamaño
const nombre = ref("");  // Campo para el tamaño

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos');
    productos.value = response.data;
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
});

const seleccionarProducto = () => {
  const productoSeleccionadoObj = productos.value.find(
    (producto) => producto.nombre === productoSeleccionado.value
  );
  if (productoSeleccionadoObj) {
    precioProducto.value = productoSeleccionadoObj.precio;
  }

  store.setProductoSeleccionado(productoSeleccionado.value);
  store.setPrecioProducto(precioProducto.value);
};

// Función para enviar el pedido
const sendOrder = () => {
  if (!authStore.isAuthenticated) {
    alert('Debes iniciar sesión para personalizar y enviar un pedido.');
    return;  // Evitar que el formulario se envíe si no está autenticado
  }

  // Buscar el ID del producto
  const productoSeleccionadoObj = productos.value.find(
    (producto) => producto.nombre === productoSeleccionado.value
  );
  const productoId = productoSeleccionadoObj ? productoSeleccionadoObj.id : null;

  if (!productoId) {
    alert('Producto no encontrado.');
    return;
  }

  // Mostrar el id del producto en la consola
  console.log('ID del producto seleccionado:', productoId);

  const orderData = {
    usuarioId: authStore.userId,  // Usar el ID del usuario del store
    productoId: productoId,  // Añadir el ID del producto
    objectName: objectName.value,
    altura: altura.value,
    anchura: anchura.value,
    profundidad: profundidad.value,
    material: material.value,
    color: color.value,
    comments: comments.value,
    precioProducto: precioProducto.value,
    textoQR: textoQR.value,
    tamaño: tamaño.value,
    nombre: nombre.value,
  };

  store.setOrder(orderData); // Guardar el pedido en el store
  router.push('/confirmarPedido');  // Redirigir a la página de confirmación
};


</script>


<template>
  <section class="container">
    <h2>Personalizar pedido</h2>
    <p> En este formulario, podrás <span> crear una pieza única </span> que se ajuste exactamente a tus necesidades.
    </p>
    <div class="form-container">
      <form @submit.prevent="sendOrder">
        <!-- Selección del producto -->
        <label>Producto</label>
        <select v-model="productoSeleccionado" @change="seleccionarProducto" required>
          <option value="" disabled selected>Selecciona un producto</option>
          <option v-for="producto in productos" :key="producto.id" :value="producto.nombre">
            {{ producto.nombre }}
          </option>
          <option value="Otros">Otros...</option>
        </select>

        <!-- Mostrar campo para texto del código QR solo si el producto seleccionado es "Código QR" -->
        <div v-if="productoSeleccionado === 'Código QR'">
          <label>Texto para el Código QR</label>
          <input type="text" v-model="textoQR" placeholder="Escribe lo que quieres en el QR" required />
        </div>

        <!-- Mostrar campo adicional solo si el producto tiene un nombre adicional (por ejemplo, Llavero) -->
        <div v-if="productoSeleccionado === 'Llavero nombre'">
          <label>Nombre para el llavero</label>
          <input type="text" v-model="objectName" placeholder="Escribe el nombre que deseas" required />
        </div>

        <!-- Campo de tamaño si no es "Otros" -->
        <div v-if="productoSeleccionado !== 'Otros'">
          <label>Tamaño</label>
          <select v-model="tamanyo" required>
            <option value="" disabled selected>Selecciona un tamaño</option>
            <option value="Grande">Grande</option>
            <option value="Mediano">Mediano</option>
            <option value="Pequeño">Pequeño</option>
          </select>
        </div>

        <!-- Dimensiones si el producto es "Otros" -->
        <div v-if="productoSeleccionado === 'Otros'">
          <label>Nombre del producto</label>
          <input type="text" v-model="nombre" placeholder="Nombre" required />
          <label>Altura</label>
          <input type="number" min="0" v-model="altura" placeholder="Cm" required />
          <label>Anchura</label>
          <input type="number" min="0" v-model="anchura" placeholder="Cm" required />
          <label>Profundidad</label>
          <input type="number" min="0" v-model="profundidad" placeholder="Cm" required />
        </div>

        <!-- Material -->
        <label>Material</label>
        <select v-model="material" required>
          <option value="" disabled selected>Selecciona un material</option>
          <option value="PLA">PLA</option>
          <option value="PETG">PETG</option>
          <option value="TPU">TPU (Flexible)</option>
        </select>

        <!-- Color -->
        <label>Color</label>
        <select v-model="color" required>
          <option value="" disabled selected>Selecciona un color</option>
          <option value="Negro">Negro</option>
          <option value="Rojo">Rojo</option>
          <option value="Dorado">Dorado</option>
          <option value="Blanco">Blanco</option>
          <option value="Amarillo">Amarillo</option>
          <option value="Marron">Marron</option>
          <option value="Gris">Gris plata</option>
          <option value="Morado">Morado</option>
          <option value="Cobre">Cobre</option>
        </select>

        <!-- Comentarios adicionales -->
        <label>Comentarios adicionales</label>
        <textarea v-model="comments" placeholder="Descripción adicional"></textarea>

        <!-- Botón para confirmar el pedido -->
        <button type="submit">Confirmar Pedido</button>
      </form>
    </div>
  </section>
</template>


<style scoped>
.container{
  margin: 2%;
  margin-top: 10%;
  margin-bottom: 10%;
  border-radius: 10px;
}

h2 {
    font-size: 300%;
    color: rgb(77, 77, 77);
    text-transform: uppercase;
    text-align: center;
    margin-bottom: -5%;
}

.span-text {
  font-weight: 400;
  color: rgb(138, 45, 45);
}

/* Estilos generales */
form {
  width: 30%;
  padding: 3%;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Arial, sans-serif;
  background-color: rgb(172, 11, 11);
  box-shadow: 15px 3px 20px #0004,
    -15px 0px 30px #0002;
    margin-top: 4%;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Estilo para etiquetas */
label {
  font-size: 1rem;
  font-weight: 550;
  color: white;
}

/* Estilo para inputs y select */
input,
select,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.674);
  border-radius: 20px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

/* Transiciones al enfocar */
input:focus,
select:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Estilo para textarea */
textarea {
  height: 120px;
  resize: none;
}

/* Estilo del botón */
button {
  width: 100%;
  padding: 12px 20px;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.219);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  font-weight: 600;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.438);
}

textarea::placeholder,
input::placeholder {
  font-weight: 300;
  font-size: 85%;
  color: white;
}

p {
  width: 100%;
  text-align: center;
  font-size: 120%;
  color: rgb(83, 83, 83);
  margin-top: 5%;
}

span {
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.intro {
  display: flex;
  flex-direction: column;

  align-items: left;
  width: 100%;
  text-align: left;
}

.intro p {
  width: 80%;
  text-align: left;
}
</style>
