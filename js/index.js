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
    var selectedIndex=vs.selectedIndex<0?0:vs.selectedIndex;
    vs.innerHTML='';
    vcs.forEach(voice => {
        const opt = document.createElement('option');
        opt.textContent = voice.name + '(' + voice.lang + ')';
        opt.setAttribute('data-lang', voice.lang);
        opt.setAttribute('data-name', voice.name);
        vs.appendChild(opt);
    });
    vs.selectedIndex=selectedIndex;
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
        syn.cancel();
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

function readFile(){
    var file=document.getElementById("myfile").files[0];
    if(file){
        var reader=new FileReader();
        reader.readAsText(file);
        reader.onload=function(evt){
            document.getElementById("text-input").innerHTML=evt.target.result;
        }
        reader.onerror=function(evt){
            document.getElementById("text-input").innerHTML="error reading file";
        }
    }
}

function saveAudio(){

        let ttsRecorder = new SpeechSynthesisRecorder({
            text: ti , utteranceOptions: {
                voice: "english-us espeak",
                lang: "en-US",
                pitch: 0.75,
                rate: 1
            }
        });

        ttsRecorder.start()
            .then(tts => tts.blob())
            .then(({
                tts, data
            }) => {
                // do stuff with `ArrayBuffer`, `AudioBuffer`, `Blob`, `MediaSource`, `MediaStream`, `ReadableStream`
                console.log(tts, data);
                tts.audioNode.src = URL.createObjectURL(data);
                tts.audioNode.title = tts.utterance.text;
                tts.audioNode.onloadedmetadata = () => {
                    console.log(tts.audioNode.duration);
                    tts.audioNode.play();
                }
            })

            .catch(err => console.log(err));

}