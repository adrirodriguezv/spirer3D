<script setup>
import { ref, computed } from 'vue';

// Datos de los materiales con precios reales
const materials = {
  PLA: { pricePerKg: 18, density: 1.24 },
  PETG: { pricePerKg: 20, density: 1.27 },
  TPU: { pricePerKg: 25, density: 1.20 },
};

// Variables reactivas inicializadas vacías
const width = ref(null);
const height = ref(null);
const depth = ref(null);
const selectedMaterial = ref('');
const printTime = ref(null);
const costPerHour = ref(null);

// Cálculo del volumen en cm³
const volume = computed(() => {
  if (width.value > 0 && height.value > 0 && depth.value > 0) {
    return width.value * height.value * depth.value;
  }
  return 0;
});

// Cálculo del costo del material por cm³
const materialCostPerCm3 = computed(() => {
  if (!selectedMaterial.value || !materials[selectedMaterial.value]) return 0;
  const material = materials[selectedMaterial.value];
  const cm3PerKg = 1000 / material.density;
  return material.pricePerKg / cm3PerKg;
});

// Cálculo del costo total
const totalCost = computed(() => {
  if (volume.value > 0 && printTime.value > 0 && costPerHour.value > 0) {
    const materialCost = volume.value * materialCostPerCm3.value;
    const printingCost = printTime.value * costPerHour.value;
    return materialCost + printingCost;
  }
  return 0;
});
</script>

<template>
  <section>
    <h2>Calculadora de precio</h2>
    <form>
      <label>Ancho</label>
      <input type="number" v-model.number="width" min="0" placeholder="Cm" required>

      <label>Alto</label>
      <input type="number" v-model.number="height" min="0" placeholder="Cm" required>

      <label>Profundidad</label>
      <input type="number" v-model.number="depth" min="0" placeholder="Cm" required>

      <label>Material</label>
      <select v-model="selectedMaterial" required>
        <option value="" disabled selected>Selecciona un material</option>
        <option value="PLA">PLA</option>
        <option value="PETG">PETG</option>
        <option value="TPU">TPU (Flexible)</option>
      </select>

      <label>Tiempo de Impresión (horas)</label>
      <input type="number" v-model.number="printTime" min="0" placeholder="Ej: 5" required>

      <label>Costo por Hora (€)</label>
      <input type="number" v-model.number="costPerHour" min="0" placeholder="Ej: 2" required>

      <div v-if="totalCost > 0" class="result">
        Precio Total: {{ totalCost.toFixed(2) }} €
      </div>
    </form>
  </section>
</template>

<style scoped>
section {
  margin-top: 10%;
  margin-bottom: 15%;
}

h2 {
    text-align: left;
    margin-left: 10%;
    margin-right: 8%;
    border-bottom: 1px #5454546b solid ;
}

/* Estilos generales */
form {
  width: 40%;
  padding: 30px 25px;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Arial, sans-serif;
  border: 2px white solid;
  background-color: rgba(255, 255, 255, 0.329);
  margin-top: 5%;
}

/* Estilo para etiquetas */
label {
  font-size: 1rem;
  font-weight: 550;
  font-style: italic;
}

/* Estilo para inputs y select */
input,
select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  background: transparent;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

/* Transiciones al enfocar */
input:focus,
select:focus {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Estilo del resultado */
.result {
  margin-top: 10px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #4CAF50;
  border: 2px solid #4CAF50;
}

textarea::placeholder, input::placeholder{
    font-weight: 300;
    font-style: italic;
    font-size: 85%;
}
</style>
