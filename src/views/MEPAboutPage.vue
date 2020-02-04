<template>
    <div>
      <strong> Computed: {{computedInfo}} </strong> <br/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-class-decorator';

// TODO : huge page showing infos about a Deputato

@Component({})
export default class DeputatiAboutPage extends Vue {
    mounted() : void {

    }

    get computedInfo() : string {
        return "Computed" + " " + "about";
    }

}
</script>
<style lang="scss" scoped>

</style>