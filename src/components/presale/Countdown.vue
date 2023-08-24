<template>
    <v-container class="mt-16">
        <v-row class="mt-16">
            <v-col cols="12">
                <v-card class="pa-8 ma-8" :dark="true">
                    <div class="text-center font-weight-bold">EMAS PRESALE OPENS IN</div>
                    <!-- mainColor="#f3e5f5" secondFlipColor="#360a3f" -->
                    <vue3-flip-countdown class="my-4" deadlineDate="2023-08-31 23:59:59" mainColor="#f3e5f5" secondFlipColor="#fbf5fc"  
                        mainFlipBackgroundColor="#360a3f" secondFlipBackgroundColor="#862999" />
                    <div class="text-center font-weight-bold">31 AUGUST 2023</div>
                </v-card>
            </v-col>
        </v-row>
    </v-container> 
</template>
  
<script>
// @ is an alias to /src
export default {
  name: 'countdown',
  props: {
    isMobileDevice: Boolean,
    dark: Boolean,
    windowWidth: Number,
    windowHeight: Number,
    drawer: Boolean
  },
  data: () => ({
    gleamUrl: '',
  }),
  components: {
  },
  computed: {

  },
  watch: {
  },
  created() {
  },
  methods: {
 
  }
}
</script>
  