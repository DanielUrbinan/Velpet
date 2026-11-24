/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Draggable } from 'gsap/Draggable'
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable)

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu-links a')
  const bgImgs = document.querySelectorAll('.menu-bg')
  console.log(bgImgs)
  // const menuOverlay = document.querySelector('.menu-overlay')

  gsap.set(bgImgs, {
    opacity: 0
  })

  gsap.set(bgImgs[0], {
    opacity: 1
  })
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const bgName = link.dataset.bg
      console.log(bgName)
      const targetImg = document.querySelector(`.menu_img img[data-bg-for="${bgName}"]`)
      console.log(targetImg)

      gsap.to(bgImgs, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      })
      gsap.to(targetImg, {
        opacity: 1,
        duration: 0.5,
        scale: 1.08,
        ease: 'power3.inOut'
      })
      gsap.to(links, {
        opacity: 0.4,
        duration: 0.3
      })

      gsap.to(link, {
        opacity: 1,
        x: 20,
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    link.addEventListener('mouseleave', () => {
      gsap.to(bgImgs, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power1.inOut'
      })
      gsap.to(bgImgs[0], {
        opacity: 1,
        duration: 0.5,
        scale: 1,
        ease: 'power3.inOut'
      })
      gsap.to(links,
        {
          opacity: 1,
          duration: 0.3
        }
      )
      gsap.to(link, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  }
  )
})

/* -----3d element--------- */
const canva = document.querySelector('.about-webg1')
const initDesktopAbout = () => {
  const scene = new THREE.Scene()
  const loader = new GLTFLoader()
  const aboutSection = document.getElementById('about-desktop')
  const sizes = {
    width: aboutSection.clientWidth,
    height: aboutSection.clientHeight
  }
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  const cameraTarget = {
    x: 0,
    y: 0,
    z: 0
  }

  const text = document.querySelectorAll('.text')
  const title = document.querySelectorAll('.title')
  const bg_fs = document.querySelectorAll('.finalScene-bg')

  const positions = {
    desktop: {
    // scene 1
      cameraScene1ZF: 6,
      cameraScene1ZE: 2.5,
      // scene 2
      dogStartX: -0.2,
      dogStartY: 0,
      cameraStartZ: 2.5,

      // scene 3
      dogScene3X: -0.8,
      dogScene3Y: -0.5,
      dogScene3Z: 0.9,
      // scene 4
      dogScene4X: 0.08,
      dogScene4YF: -0.5,
      dogScene4YE: 2,
      dogScene4Z: 1.5,
      germanScene4XF: -0.6,
      germanScene4YF: -0.5,
      germanScene4XE: 0.6,
      germanScene4YE: -0.5,
      germanScene4Z: 0.5,
      // Final Scene
      germanScene5XF: 0.9,
      germanScene5YF: -0.5,
      germanScene5YZ: 0.1,
      dogScene5YF: -0.40,
      dogScene5XF: 1.4,
      dogScene5ZF: 0.9,
      dogScene5RotationY: Math.PI * -0.50,
      dogScene5RotationX: Math.PI * -0.05,
      terrierScene5XF: 1.1,
      terrierScene5ZF: 0.2,
      terrierScene5YF: -0.5
    },
    mobile: {
    // scene 1
      cameraScene1ZF: 6,
      cameraScene1ZE: 3,
      // scene 2
      dogStartX: -0.2,
      dogStartY: 0,
      cameraStartZ: 2.5,

      // scene 3
      dogScene3X: -0.8,
      dogScene3Y: -0.5,
      dogScene3Z: 1.2,
      // scene 4
      dogScene4X: 0.08,
      dogScene4YF: -0.5,
      dogScene4YE: 2,
      dogScene4Z: 1.5,
      germanScene4XF: -0.6,
      germanScene4YF: -0.5,
      germanScene4XE: 0.7,
      germanScene4YE: -0.5,
      germanScene4Z: 0.2,
      // Final Scene
      germanScene5XF: 0.8,
      germanScene5YF: -0.5,
      germanScene5YZ: 0.1,
      dogScene5YF: -0.05,
      dogScene5XF: 0.95,
      dogScene5ZF: 0.1,
      dogScene5RotationY: Math.PI * -0.30,
      dogScene5RotationX: Math.PI * 0.05,
      terrierScene5XF: 1.1,
      terrierScene5ZF: 0.2
    }
  }

  const createScrollAnimation = (responsive) => {
  // RESET INITIAL 3D STATE
    dog.position.set(0, 0, 0)
    dog.rotation.set(
      Math.PI * 0.2,
      Math.PI * 1.3,
      0
    )
    camera.position.z = responsive.cameraScene1ZF
    dogMaterials.forEach(material => {
      material.opacity = 1
    })
    germanMaterials.forEach(material => {
      material.opacity = 0
    })
    terrierMaterials.forEach(material => {
      material.opacity = 0
    })
    dog.visible = true
    german.visible = false
    terrier.visible = false
    const revealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about-desktop',
        start: 'top bottom',
        end: 'top 5%',
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    })
    // about velpet reveal
    revealTimeline.to(dog.rotation, {
      y: Math.PI * -0.1,
      x: Math.PI * 0,
      ease: 'sine.inOut'
    }, 0)
    revealTimeline.to(camera.position,
      {
        z: responsive.cameraScene1ZE,
        ease: 'sine.inOut'
      }, 0
    )
    // about me continue animation
    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about-desktop',
        start: 'top top',
        end: '+=3000',
        scrub: 2,
        pin: true,
        invalidateOnRefresh: true
      }
    })
    aboutTimeline.addLabel('scene2')
    aboutTimeline.to(dog.position, {
      x: responsive.dogStartX,
      ease: 'none'
    }, 'scene2')

    aboutTimeline.fromTo(
      text[0],
      {
        opacity: 0,
        yPercent: 10,
        lineHeight: 1.4
      },
      {
        opacity: 1,
        yPercent: 0,
        lineHeight: 1.2
      }, 'scene2'
    )
    /* aboutTimeline.to('.bg-shape-1', {
    opacity: 0.18,
    xPercent: 15,
    scale: 1.1,
    ease: 'none'
  }, 'scene2')

  aboutTimeline.to('.bg-shape-2', {
    opacity: 0.16,
    xPercent: -10,
    scale: 1.15,
    ease: 'none'
  }, 'scene2') */
    aboutTimeline.addLabel('scene3')
    aboutTimeline.to('.paw-1', {
      x: -300,
      y: -150,
      rotation: -100,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3')

    aboutTimeline.to('.paw-2', {
      x: 300,
      y: -150,
      rotation: 100,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3')

    aboutTimeline.to('.paw-3', {
      x: -300,
      y: 150,
      rotation: -80,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3')

    aboutTimeline.to('.paw-4', {
      x: 300,
      y: 150,
      rotation: 80,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3')
    aboutTimeline.to('.bone-1', {
      x: -350,
      rotation: -220,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3+=0.05')

    aboutTimeline.to('.bone-2', {
      x: 350,
      rotation: 220,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3+=0.05')
    aboutTimeline.to('.ball-1', {
      x: -400,
      y: 100,
      rotation: -540,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3+=0.08')
    aboutTimeline.to('.title-1', {
      yPercent: -40,
      opacity: 0,
      ease: 'power2.out'
    }, 'scene3')
    aboutTimeline.to('.ball-2', {
      x: 400,
      y: 100,
      rotation: 540,
      opacity: 0,
      ease: 'power2.in'
    }, 'scene3+=0.08')
    aboutTimeline.to('.about-fx', {
      scale: 4,
      ease: 'power2.inOut'
    }, 'scene3+=0.10')
    aboutTimeline.to(
      text[0],
      {
        opacity: 0,
        yPercent: -20,
        ease: 'back.out'
      }, 'scene3-=0.03'
    )
    // figure changed
    aboutTimeline.to(dog.rotation, {
      y: Math.PI * 0.3
    }, 'scene3')
    aboutTimeline.to(dog.position, {
      y: responsive.dogScene3Y,
      x: responsive.dogScene3X
    }, 'scene3+=0.03')

    aboutTimeline.to(camera.position, {
      z: responsive.dogScene3Z
    }, 'scene3')

    aboutTimeline.fromTo(text[1],
      {
        opacity: 0,
        yPercent: 10,
        lineHeight: 1.4
      },
      {
        opacity: 1,
        yPercent: 0,
        lineHeight: 1.2,
        ease: 'power1.out'
      }, 'scene3+=0.2')
    aboutTimeline.fromTo(
      title[1], {
        opacity: 0,
        yPercent: 30,
        scale: 0.94
      }, {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        ease: 'power2.out'
      }, 'scene3+=0.20'
    )
    aboutTimeline.addLabel('scene4')

    aboutTimeline.to('.scene3-bg', {
      scale: 30,
      ease: 'power2.inOut'
    }, 'scene4')
    aboutTimeline.fromTo(
      title[2],
      {
        opacity: 0,
        scale: 0.90,
        xPercent: 20
      },
      {
        opacity: 1,
        scale: 1,
        xPercent: 0
      }, 'scene4+=0.10'
    )
    aboutTimeline.to(
      title[1],
      {
        opacity: 0,
        yPercent: -30,
        zIndex: -1,
        ease: 'back.out'
      }, 'scene4-=0.03'
    )
    aboutTimeline.to(
      text[1],
      {
        opacity: 0,
        yPercent: -20,
        zIndex: -1,
        ease: 'back.out'
      }, 'scene4-=0.03'
    )
    aboutTimeline.to(dog.rotation, {
      y: Math.PI * 0.001
    }, 'scene4')
    aboutTimeline.to(camera.position, {
      z: responsive.dogScene4Z
    }, 'scene4')
    aboutTimeline.to(dog.position, {
      x: responsive.dogScene4X
    }, 'scene4')
    aboutTimeline.to(dogMaterials, {
      opacity: 0,
      ease: 'back.inOut'
    }, 'scene4-=0.2')
    aboutTimeline.set(
      german, { visible: true }, 'scene4-=0.2'
    )
    aboutTimeline.to(
      germanMaterials, {
        opacity: 1,
        ease: 'back.inOut'
      }, 'scene4-=0.12'
    )
    // DRAG THE DOG TO THE RIGHT
    aboutTimeline.to(dog.rotation, {
      y: Math.PI * -0.35,
      x: Math.PI * -0.10,
      ease: 'none'
    }, 'scene4+=0.4')
    aboutTimeline.to(dog.position,
      { x: responsive.dogScene4YE }, 'scene4+=0.4'
    )
    aboutTimeline.fromTo(german.rotation,
      {
        y: Math.PI * 0.26,
        x: Math.PI * -0.10
      },
      {
        y: Math.PI * -0.25,
        x: Math.PI * -0.10,
        ease: 'none'
      }, 'scene4'
    )
    aboutTimeline.fromTo(
      german.position, { x: responsive.germanScene4XF, y: responsive.germanScene4YF }, { y: responsive.germanScene4YE, x: responsive.germanScene4XE, ease: 'none' }, 'scene4')

    aboutTimeline.to(
      german.position, {
        z: responsive.germanScene4Z
      }, 'scene4+=0.10'
    )
    aboutTimeline.fromTo(
      text[2], {
        opacity: 0,
        yPercent: 10,
        lineHeight: 1.4
      },
      {
        opacity: 1,
        yPercent: 0,
        lineHeight: 1.2
      }, 'scene4+=0.40'
    )
    aboutTimeline.addLabel('finalScene')
    aboutTimeline.fromTo(
      bg_fs[0], {
        opacity: 0,
        scale: 0.90,
        xPercent: 100
      },
      {
        opacity: 1,
        xPercent: 0,
        scale: 1
      }, 'finalScene'
    )
    aboutTimeline.fromTo(
      bg_fs[1], {
        opacity: 0,
        scale: 0.90,
        xPercent: 100
      },
      {
        opacity: 1,
        xPercent: 0,
        scale: 1
      }, 'finalScene+=0.10'
    )
    aboutTimeline.fromTo(
      bg_fs[2], {
        opacity: 0,
        scale: 0.90,
        xPercent: 100
      },
      {
        opacity: 1,
        xPercent: 0,
        scale: 1
      }, 'finalScene+=0.15'
    )
    aboutTimeline.fromTo(
      '.title-4 h2',
      {
        xPercent: -110,
        opacity: 0
      },
      {
        xPercent: 0,
        opacity: 1,
        ease: 'power3.out'
      },
      'finalScene+=0.15'
    )

    aboutTimeline.fromTo(
      '.title-4 span',
      {
        yPercent: 120,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        ease: 'power2.out'
      },
      'finalScene+=0.28'
    )

    aboutTimeline.to(
      title[2], {
        xPercent: -20,
        opacity: 0,
        ease: 'back.inOut'
      }, 'finalScene'
    )
    aboutTimeline.to(
      text[2], {
        xPercent: -20,
        opacity: 0,
        ease: 'back.inOut'
      }, 'finalScene'
    )
    aboutTimeline.to(
      german.position, {
        x: responsive.germanScene5XF,
        y: responsive.germanScene5YF,
        z: responsive.germanScene5YZ
      }, 'finalScene'
    )
    aboutTimeline.to(
      german.rotation, {
        y: Math.PI * -0.30,
        x: Math.PI * -0.05
      }, 'finalScene'
    )
    aboutTimeline.to(
      dog.position, {
        y: responsive.dogScene5YF,
        x: responsive.dogScene5XF,
        z: responsive.dogScene5ZF
      }, 'finalScene'
    )
    aboutTimeline.to(
      dog.rotation, {
        y: responsive.dogScene5RotationY,
        x: responsive.dogScene5RotationX
      }, 'finalScene'
    )

    aboutTimeline.to(
      dogMaterials, {
        opacity: 1
      }, 'finalScene'
    )
    aboutTimeline.to(
      terrier.position, {
        x: responsive.terrierScene5XF,
        z: responsive.terrierScene5ZF,
        y: responsive.terrierScene5YF
      }, 'finalScene-=0.02'
    )
    aboutTimeline.to(
      terrier.rotation, {
        y: Math.PI * 1.15
      }, 'finalScene'
    )
    aboutTimeline.set(
      terrier, {
        visible: true
      }, 'finalScene-=0.3'
    )
    aboutTimeline.fromTo(
      terrierMaterials,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'back.in'
      }, 'finalScene-=0.2'
    )
  }

  let dog
  let german
  let terrier

  const dogMaterials = []
  const germanMaterials = []
  const terrierMaterials = []

  const loadDog = async () => {
    try {
      const base = import.meta.env.BASE_URL

      const [gltf, gltf2, gltf3] = await Promise.all([loader.loadAsync(
      `${base}Models/dog/source/model.glb`
      ), loader.loadAsync(
      `${base}Models/german/source/model.glb`
      ), loader.loadAsync(
      `${base}Models/terrier/source/scene 14.glb`
      )])
      dog = gltf.scene
      german = gltf2.scene
      terrier = gltf3.scene
      dog.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true
          child.material.depthWrite = false
          child.renderOrder = 3
          dogMaterials.push(child.material)
        }
      })

      german.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true
          child.material.depthWrite = false
          child.renderOrder = 1
          germanMaterials.push(child.material)
        }
      })
      terrier.traverse((child) => {
        if (child.isMesh) {
          const oldMaterial = child.material

          child.material = new THREE.MeshStandardMaterial({
            map: oldMaterial.map,
            transparent: true,
            opacity: oldMaterial.opacity
          })

          child.material.depthWrite = false
          child.renderOrder = 2

          terrierMaterials.push(child.material)
        }
      })
      const terrierLight = new THREE.PointLight(
        0xffffff,
        60,
        60
      )

      terrierLight.position.set(0, 1, 2)

      terrier.add(terrierLight)

      terrier.rotation.y = Math.PI
      terrier.position.y = -0.5
      germanMaterials.forEach((material) => {
        material.opacity = 0
      })
      terrierMaterials.forEach(material => {
        material.opacity = 0
      })

      scene.add(dog)
      scene.add(german)
      scene.add(terrier)

      // eslint-disable-next-line no-unused-vars
      const box = new THREE.Box3().setFromObject(dog)
      // eslint-disable-next-line no-unused-vars
      const box2 = new THREE.Box3().setFromObject(german)
      const box3 = new THREE.Box3().setFromObject(terrier)
      const mm = gsap.matchMedia()

      createScrollAnimation(positions.desktop)
      ScrollTrigger.refresh()
      window.requestAnimationFrame(() => {
        document
          .querySelector('.about-loader')
          ?.classList.add('is-ready')
      })
    } catch (e) {
      console.log('Error loading dog', e)
    }
  }

  loadDog()

  camera.position.z = 2.4
  scene.add(camera)

  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.8
  )

  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
  )

  directionalLight.position.set(-2, 3, 4)

  scene.add(directionalLight)
  const renderer = new THREE.WebGLRenderer({
    canvas: canva,
    alpha: true
  })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(
    sizes.width,
    sizes.height
  )
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  )

  let resizeTimer
  let lastWidth = window.innerWidth
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth
    if (newWidth === lastWidth) return
    lastWidth = newWidth
    sizes.width = aboutSection.clientWidth
    sizes.height = aboutSection.clientHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(
      sizes.width,
      sizes.height
    )

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )

    clearTimeout(resizeTimer)

    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
  })
  window.addEventListener('load', () => {
    ScrollTrigger.refresh()
  })
  let isAboutVisible = false

  const animate = () => {
    if (isAboutVisible) {
      camera.lookAt(
        cameraTarget.x,
        cameraTarget.y,
        cameraTarget.z
      )
      renderer.render(scene, camera)
    }
    window.requestAnimationFrame(animate)
  }
  animate()

  const aboutObserver = new window.IntersectionObserver(
    ([entry]) => {
      isAboutVisible = entry.isIntersecting
    },
    {
      rootMargin: '100% 0px 100% 0px'
    }
  )

  aboutObserver.observe(aboutSection)
}
const initMobileAbout = () => {
  const root = document.getElementById('about-mobile')

  if (!root) return

  // All searches are restricted to #about-mobile
  const $ = (selector, context = root) =>
    gsap.utils.toArray(selector, context)

  // Pause the tag sway when About isn't near the viewport
  const observer = new window.IntersectionObserver(([entry]) => {
    root.classList.toggle('is-off', !entry.isIntersecting)
  })

  observer.observe(root)

  // Split mobile titles into words
  $('.mobile-title h2').forEach(heading => {
    heading.innerHTML = heading.textContent
      .trim()
  })

  const mmMobile = gsap.matchMedia()

  mmMobile.add(
    {
      mobile: '(max-width: 700px)',
      motion: '(prefers-reduced-motion: no-preference)'
    },
    context => {
      const { mobile, motion } = context.conditions

      if (!mobile || !motion) return

      const scenes = $('.mobile-scene')
      const bgs = $('.mobile-bg')

      const wrap = root.querySelector('.mobile-tag-wrap')
      const tag = root.querySelector('.mobile-tag')
      const eng = root.querySelector('.mobile-engrave')

      const confs = $('.mobile-conf')

      const words = scene =>
        $('.mobile-w > span', scene)

      const chips = number =>
        $(`.mobile-k${number}`)

      const hold = [1.6, 2.4, 1.6, 1.5]
      const OUT = 0.4

      const typed = { n: 0 }

      gsap.set($('.mobile-chip'), {
        xPercent: -50,
        yPercent: -50
      })

      gsap.set(scenes[0], {
        autoAlpha: 1
      })

      const pop = (timeline, elements, at) => {
        timeline.fromTo(
          elements,
          {
            autoAlpha: 0,
            scale: 0,
            z: -300,
            rotation: -25
          },
          {
            autoAlpha: 1,
            scale: 1,
            z: 0,
            rotation: (i, element) => +element.dataset.r,
            duration: 0.35,
            stagger: 0.07,
            ease: 'back.out(2)'
          },
          at
        )
      }

      const unpop = (timeline, elements, at) => {
        timeline.to(
          elements,
          {
            autoAlpha: 0,
            scale: 0.5,
            z: 200,
            duration: OUT,
            ease: 'power2.in'
          },
          at
        )
      }

      // INTRO
      const intro = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power3.out'
        }
      })

      intro
        .from(wrap, {
          autoAlpha: 0,
          z: -700,
          y: -140,
          duration: 0.9,
          ease: 'back.out(1.3)'
        })
        .from(
          words(scenes[0]),
          {
            yPercent: 110,
            rotationX: -70,
            stagger: 0.06,
            duration: 0.5
          },
          0.2
        )
        .from(
          $('.mobile-title p, .mobile-text', scenes[0]),
          {
            y: 60,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.5
          },
          0.45
        )

      pop(intro, chips(1), 0.85)

      ScrollTrigger.create({
        trigger: root,
        start: 'top 75%',
        once: true,
        onEnter: () => intro.play()
      })

      // MAIN MOBILE STORY
      const tl = gsap.timeline({
        defaults: {
          ease: 'none'
        },

        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=550%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })

      let t = 0
      const st = []

      scenes.forEach((scene, i) => {
        st.push(t)

        if (i) {
          const body = $(
            '.mobile-text, .mobile-title span',
            scene
          )

          tl.fromTo(
            scene,
            {
              autoAlpha: 0
            },
            {
              autoAlpha: 1,
              duration: 0.05
            },
            t
          )
            .from(
              words(scene),
              {
                yPercent: 110,
                rotationX: -70,
                stagger: 0.06,
                duration: 0.35,
                ease: 'power3.out'
              },
              t + 0.05
            )

          if (body.length) {
            tl.from(
              body,
              {
                y: 140,
                autoAlpha: 0,
                rotationX: 20,
                duration: 0.45,
                ease: 'power3.out'
              },
              t + 0.15
            )
          }

          tl.to(
            bgs[i],
            {
              opacity: 1,
              duration: 0.7
            },
            t - OUT
          )
        }

        if (i < scenes.length - 1) {
          tl.to(
            scene,
            {
              autoAlpha: 0,
              y: -50,
              duration: OUT,
              ease: 'power2.in'
            },
            t + hold[i] - OUT
          )
        }

        t += hold[i]
      })

      // TAG ANIMATION
      tl.to(
        tag,
        {
          rotationY: 180,
          duration: 0.7,
          ease: 'power2.inOut'
        },
        st[1] - 0.1
      )
        .to(
          typed,
          {
            n: 3,
            duration: 0.5,
            snap: 'n',

            onUpdate: () => {
              eng.textContent =
                'MAX'.slice(0, typed.n)
            }
          },
          st[1] + 0.6
        )
        .to(
          tag,
          {
            rotationY: 360,
            duration: 0.7,
            ease: 'power2.inOut'
          },
          st[2] - 0.1
        )
        .to(
          tag,
          {
            rotationY: 720,
            scale: 1.7,
            y: () => window.innerHeight * 0.17,
            duration: 0.9,
            ease: 'power2.inOut'
          },
          st[3] - 0.1
        )

      // CHIPS
      unpop(tl, chips(1), st[0] + hold[0] - OUT)

      pop(tl, chips(2), st[1] + 0.35)

      unpop(tl, chips(2), st[1] + hold[1] - OUT)

      pop(tl, chips(3), st[2] + 0.35)

      unpop(tl, chips(3), st[2] + hold[2] - OUT)

      // FINAL PAW CONFETTI
      const radius = () =>
        Math.min(window.innerWidth * 0.42, 260)

      tl.fromTo(
        confs,
        {
          autoAlpha: 0,
          scale: 0,
          x: 0,
          y: 0
        },
        {
          autoAlpha: 1,
          scale: 1,

          x: i =>
            Math.cos(i * 0.785) * radius(),

          y: i =>
            Math.sin(i * 0.785) *
            radius() *
            0.8,

          rotation: i => i * 40,

          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out'
        },

        st[3] + 0.25
      )

      // Small hold before releasing the pin
      tl.to({}, {
        duration: 0.3
      }, t)
    }
  )
}
if (window.matchMedia('(min-width: 701px)').matches) {
  initDesktopAbout()
} else {
  initMobileAbout()
}
/* PRODUCTS ANIMATION */
gsap.set('.products li', { xPercent: 400, opacity: 0, scale: 0 })
gsap.registerPlugin(ScrollTrigger)

const root = document.getElementById('product')
const stage = root.querySelector('.stage')
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const TRAVEL = 200
const spacing = 0.25
const snapTime = gsap.utils.snap(spacing)
const products = gsap.utils.toArray('.products li', root)
const n = products.length

// degradados de marca: el fondo cambia con cada producto (siempre oscuro arriba y claro abajo)
const BGS = [
  'linear-gradient(180deg, #18ab97 0%, #65c6b7 38%, #d8e6d8 72%, #fff8ec 100%)',
  'linear-gradient(180deg, #1caa84 0%, #7ad9bd 40%, #e9f0d4 75%, #fbf1c4 100%)',
  'linear-gradient(180deg, #0fa692 0%, #25b892 35%, #c9ecd9 72%, #f1ead8 100%)',
  'linear-gradient(180deg, #285647 0%, #1caa84 45%, #a9e0cf 80%, #f6efd0 100%)'
]
const layers = gsap.utils.toArray('.bg', root)
let front = 0
const changeBg = i => {
  const back = layers[1 - front]
  back.style.background = BGS[i % BGS.length]
  gsap.to(back, { opacity: 1, duration: reduce ? 0 : 0.7, overwrite: true })
  gsap.to(layers[front], { opacity: 0, duration: reduce ? 0 : 0.7, overwrite: true })
  front = 1 - front
}

gsap.set(products, { xPercent: TRAVEL, opacity: 0, scale: 0.6 })

// estilo "coverflow": las tarjetas laterales miran hacia el centro
const animateFunc = el => gsap.timeline()
  .fromTo(el, { scale: 0.6, zIndex: 0 }, { scale: 1.15, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false })
  .fromTo(el, { xPercent: TRAVEL, rotationY: -38 }, { xPercent: -TRAVEL, rotationY: 38, duration: 1, ease: 'none', immediateRender: false }, 0)
  .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'none', immediateRender: false }, 0)
  .to(el, { opacity: 0, duration: 0.15, ease: 'none', immediateRender: false }, 0.85)

const seamlessLoop = buildSeamlessLoop(products, spacing, animateFunc)
const playhead = { offset: 0 }
const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration())

// la tarjeta k queda en el centro cuando offset = k * spacing
const pad = v => String(v).padStart(2, '0')
const count = root.querySelector('.count')
const nameEl = root.querySelector('.name')
const dotsBox = root.querySelector('.dots')
let active = -1
let target = 0

const dots = products.map((p, k) => {
  const b = document.createElement('button')
  b.className = 'dot'
  b.setAttribute('aria-label', p.textContent.trim())
  b.addEventListener('click', () => {
    const cur = Math.round(target / spacing)
    let d = (((k - cur) % n) + n) % n
    if (d > n / 2) d -= n // camino más corto
    goTo((cur + d) * spacing)
  })
  dotsBox.appendChild(b)
  return b
})

const updateActive = off => {
  const i = gsap.utils.wrap(0, n, Math.round(off / spacing))
  if (i === active) return
  products[active]?.classList.remove('is-active')
  dots[active]?.classList.remove('is-active')
  products[i].classList.add('is-active')
  dots[i].classList.add('is-active')
  count.textContent = `${pad(i + 1)} / ${pad(n)}`
  nameEl.textContent = products[i].querySelector('.product-titles').textContent
  if (active !== -1) {
    changeBg(i)
    if (!reduce) gsap.fromTo(nameEl, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out', overwrite: true })
  }
  active = i
}
const render = () => {
  seamlessLoop.time(wrapTime(playhead.offset))
  updateActive(playhead.offset)
}

const scrub = gsap.to(playhead, { offset: 0, onUpdate: render, duration: 0.5, ease: 'power3', paused: true })
const goTo = offset => { // con animación (botones, puntos, al soltar)
  target = offset
  scrub.vars.offset = target
  scrub.invalidate().restart()
}
const jumpTo = offset => { // inmediato, sin tween (durante el drag)
  target = offset
  scrub.pause()
  playhead.offset = offset
  render()
}
render()

root.querySelector('.next').addEventListener('click', () => goTo(snapTime(target) + spacing))
root.querySelector('.prev').addEventListener('click', () => goTo(snapTime(target) - spacing))

// drag con pointer events
const area = root.querySelector('.list-products')
let dragging = false
let startX = 0
let startTarget = 0
const pxPerCard = () => products[0].offsetWidth * (TRAVEL * 2 / 100) * spacing

area.addEventListener('pointerdown', e => {
  dragging = true
  scrub.pause()
  startX = e.clientX
  startTarget = playhead.offset
  target = startTarget
  area.setPointerCapture(e.pointerId)
})
area.addEventListener('pointermove', e => {
  if (dragging) jumpTo(startTarget + (startX - e.clientX) * spacing / pxPerCard())
})
const endDrag = () => {
  if (!dragging) return
  dragging = false
  goTo(snapTime(target))
}
area.addEventListener('pointerup', endDrag)
area.addEventListener('pointercancel', endDrag)

// avance automático: solo si la sección se ve y el usuario no la está tocando
let visible = false
let timer
const stop = () => clearInterval(timer)
const play = () => {
  stop()
  if (!reduce && visible) timer = setInterval(() => goTo(snapTime(target) + spacing), 3200)
}
new window.IntersectionObserver(([e]) => {
  visible = e.isIntersecting
  visible ? play() : stop()
}).observe(root)
stage.addEventListener('pointerenter', stop)
stage.addEventListener('pointerleave', play)

// entrada (una sola vez al llegar)
const h2 = root.querySelector('.product-title h2')

if (!reduce) {
  const intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
  intro.from('.product-title > span', { y: 12, autoAlpha: 0, duration: 0.5 }, 0)
    .from('.list-products', { y: 50, autoAlpha: 0, duration: 0.7 }, 0.3)
    .from('.product-info', { y: 30, autoAlpha: 0, duration: 0.6 }, 0.55)
  ScrollTrigger.create({ trigger: root, start: 'top 70%', once: true, onEnter: () => intro.play() })
}

function buildSeamlessLoop (items, spacing, animateFunc) {
  let overlap = Math.ceil(1 / spacing)
  let startTime = items.length * spacing + 0.5
  let loopTime = (items.length + overlap) * spacing + 1
  let rawSequence = gsap.timeline({ paused: true })
  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat () { this._time === this._dur && (this._tTime += this._dur - 0.01) }
  })
  let l = items.length + overlap * 2
  let time; let i; let index
  for (i = 0; i < l; i++) {
    index = i % items.length
    time = i * spacing
    rawSequence.add(animateFunc(items[index]), time)
    i <= items.length && seamlessLoop.add('label' + i, time)
  }
  rawSequence.time(startTime)
  seamlessLoop.to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: 'none' })
    .fromTo(rawSequence, { time: overlap * spacing + 1 }, { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: 'none' })
  return seamlessLoop
}
