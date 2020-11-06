import { gsap } from "gsap"
import { mapState } from "vuex"

export default {
  fetch({ store }) {
    store.commit("toggleTheInit")
  },
  computed: {
    ...mapState({
      initState: state => state.init.initState
    })
  },
  watch: {
    $route() {
      this.removeChangeCursor()
    }
  },
  mounted() {
    this.customCursor()
    this.loadSections()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  updated() {
    this.removeChangeCursor()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    this.removeChangeCursor()
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  methods: {
    // ON PAGE LOAD
    loadSections() {
      gsap.set(".laserBlok-Line", {
        width: 0,
        height: 0,
        opacity: 0
      })
      if (this.initState) {
        this.$store.commit("init/toggleTheInit")
        // TYPE ANIMATION
        this.typeAnimation()
        // LASER ANIMATION
        gsap.set(".collaborate", {
          opacity: 1,
          duration: 0.33,
          delay: 3,
          ease: "expo.out"
        })
        gsap.to(".laserBlok-Line", {
          opacity: 1,
          duration: 0,
          delay: 2.5,
          ease: "none"
        })
        gsap.to(".laserBlok-Line", {
          width: "105vw",
          height: "105vh",
          duration: 0.66,
          delay: 2.5,
          ease: "expo.out"
        })
        // SECTIONS LOAD ANIMATION
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          delay: 2.5,
          stagger: {
            amount: 0.66
          }
        })
      } else {
        // LASER ANIMATION
        gsap.to(".laserBlok-Line", {
          opacity: 1,
          duration: 0,
          ease: "none"
        })
        gsap.to(".laserBlok-Line", {
          width: "105vw",
          height: "105vh",
          duration: 0.66,
          ease: "expo.out"
        })
        // SECTIONS LOAD ANIMATION
        gsap.to("section", {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.33,
          stagger: {
            amount: 0.66
          }
        })
      }
    },
    typeAnimation() {
      var tl = gsap.timeline({ repeat: 0 })
      tl.to(".typeAnimation-One", {
        opacity: 1,
        duration: 0.66,
        delay: 0.25
      })
      tl.to(".typeAnimation-One", {
        opacity: 0,
        duration: 0
      })
      tl.to(".typeAnimation-Two", {
        opacity: 1,
        duration: 0.5
      })
      tl.to(".typeAnimation-Two", {
        opacity: 0,
        duration: 0
      })
      tl.to(".typeAnimation-Three", {
        opacity: 1,
        duration: 0.33
      })
      tl.to(".typeAnimation-Three", {
        opacity: 0,
        ease: "expo.out",
        duration: 0.25
      })
      tl.to(
        ".typeAnimation-Four",
        {
          opacity: 1,
          duration: 0.25
        },
        "-=0.33"
      )
      tl.to(".typeAnimation-Four", {
        opacity: 0,
        ease: "expo.out",
        duration: 0.25
      })
      tl.to(
        ".typeAnimation-Five",
        {
          opacity: 1,
          duration: 0.66
        },
        "-=0.33"
      )
      tl.to(".typeAnimation-Five", {
        opacity: 0,
        duration: 0
      })
      tl.play()
    },
    // CURSOR
    customCursor() {
      let cursorOne = document.querySelector(".cursor-One")
      let cursorTwo = document.querySelector(".cursor-Two")
      function moveCursorOne(e) {
        gsap.to(cursorOne, 0.165, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY,
          ease: "ease"
        })
      }
      function moveCursorTwo(e) {
        gsap.to(cursorTwo, 0.165, {
          opacity: 1,
          left: e.clientX,
          top: e.clientY,
          ease: "ease",
          delay: 0.165
        })
      }
      document.addEventListener("mousemove", moveCursorOne)
      document.addEventListener("mousemove", moveCursorTwo)
    },
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    }
  }
}
