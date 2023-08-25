<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="pt-12">
                <v-card class="pa-2 ma-2" theme="light">
                    <div class="text-center font-weight-bold">EMAS PRESALE OPENS IN</div>
                    <!-- mainColor="#f3e5f5" secondFlipColor="#360a3f" -->
                    <vue3-flip-countdown class="my-2" :deadlineISO="'2023-08-29 22:00:00Z'" mainColor="#f3e5f5" secondFlipColor="#fbf5fc"  
                        mainFlipBackgroundColor="#360a3f" secondFlipBackgroundColor="#862999" countdownSize="2.2rem" labelSize="1rem" />
                    <div class="text-center font-weight-bold">30 AUGUST 2023 - 00:00 CET</div>
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
  