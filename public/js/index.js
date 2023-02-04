AOS.init({
    duration: 1300,
    once: true
});

/**
 * Typing animation
*/
const typing = document.getElementById('typing')

let text = "<Desarrollador web>"

let i = 0
const typingAnimation = () => {

    if (i < text.length) {
        typing.innerHTML += text.charAt(i)
        i++

        setTimeout( typingAnimation, 150 )
    } else {
        setTimeout( clear, 4999 )
        setTimeout( typingAnimation, 5000 )
    }
}

const clear = () => {
    i = 0
    typing.innerHTML = ""
}

typingAnimation()