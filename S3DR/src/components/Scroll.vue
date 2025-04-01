<template>
    <div>
        <section class="sticky">
            <blockquote>
                <p>Diseña tus trofeos o tu pieza a medida</p>
                <span></span>
            </blockquote>
            <img id="office" src="../assets/img/bambuLabCalibration.png" class="img1"/>
            <img id="building" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2621168/sky.jpg" class="img2"/>
        </section>
    </div>
</template>

<script setup>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arapey');

body {
    margin: 0;
    font-family: 'Arapey';
}

h1 {
    font-size: 2em;
    text-align: center;
    margin-top: 30%;
}

section {
    padding: 3em;
    height: 150vh;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 5%;
}

blockquote {
    font-size: 2.3em;
    width: 30%;
    margin-top: 17%;
    position: absolute;
}

blockquote span {
    width: 100%;
    background:  rgb(172, 11, 11);
    display: block;
    height: 5px;
    margin-top: 20px;
}

img {
    position: absolute;
}

img:nth-of-type(1) {
    width: 40%;
    right: 0;
    top: 20%;
}

img:nth-of-type(2) {
    width: 25%;
    right: 40%;
    top: 29%;
    margin-top: 15%;
}

</style>