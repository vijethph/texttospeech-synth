/* Done By Vijeth P H*/

const syn = window.speechSynthesis;
const bd = document.getElementById('one');
const tf = document.querySelector('form');
const ti = document.querySelector('#text-input');
const vs = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rv = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pv = document.querySelector('#pitch-value');



let vcs = [];
const getVoices = () => {
    vcs = syn.getVoices();
    vcs.forEach(voice => {
        const opt = document.createElement('option');
        opt.textContent = voice.name + '(' + voice.lang + ')';
        opt.setAttribute('data-lang', voice.lang);
        opt.setAttribute('data-name', voice.name);
        vs.appendChild(opt);
    });
};
getVoices();
if (syn.onvoiceschanged !== undefined) {
    syn.onvoiceschanged = getVoices;
}

const speak = () => {

    if (syn.speaking) {
        console.error('You are already speaking!!');
        return;
    }
    if (ti.value !== '') {

        bd.style.background = 'black url(img/giphy.gif)';
        bd.style.backgroundRepeat = 'repeat-x';
        bd.style.backgroundSize = 'cover';
        const st = new SpeechSynthesisUtterance(ti.value);
        st.onend = e => {
            console.log('I hope you are done speaking.\n Thank you for your boring lecture.. ');
            bd.style.background = 'black';
        }
        st.onerror = e => {
            console.error('Something is wrong.. Are you sane? ');
        }
        const stv = vs.selectedOptions[0].getAttribute('data-name');
        vcs.forEach(voice => {
            if (voice.name === stv) {
                st.voice = voice;
            }
        });

        st.rate = rate.value;
        st.pitch = pitch.value;

        syn.speak(st);
    }
};

tf.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    ti.blur();
});


rate.addEventListener('change', e => rv.textContent = rate.value);
pitch.addEventListener('change', e => pv.textContent = pitch.value);
vs.addEventListener('change', e => speak());