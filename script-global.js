const allWhiteKeys = document.querySelectorAll('.white-key')
const allBlackKeys = document.querySelectorAll('.white-key')

const chromaticScale = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]

function decideKey(){
    randRoot = chromaticScale[Math.round(Math.random() * (chromaticScale.length - 1))]
    return new Mode(randRoot,"major")
}

const key = decideKey()
console.log(key)
let keyInSharps = key.spelling.slice()
let keyInFlats = key.spelling.slice()

keyInSharps = keyInSharps.map(note => note.enharmonic("#"))
keyInFlats = keyInFlats.map(note => note.enharmonic("b"))

let passOct = false
let allPianoFlats = keyInFlats.map(note => {
    if(note.name[0] == "A" || note.name[0] == "B"){
        return note.name + "0"
    }
    else{
        return note.name + "1"
    }
}).sort((a,b)=> {
    if(a[0] == b[0]){
        if(b[1] == "b"){
            return 1
        }
        else{
            return -1
        }
    }
    else if(a > b){
        return 1
    }
    else{
        return -1
    }
})

let newArr = allPianoFlats.slice()
for(let i = 0; i < 6; i++){
    newArr = newArr.map(item => {
        if(item[item.length - 1] == String(i)){
            return item.replace(String(i),String(i + 1))
        }
        return item.replace(String(i + 1),String(i + 2))
    })
    allPianoFlats = allPianoFlats.concat(newArr)
}

if(allPianoFlats[0] == "Ab0"){
    allPianoFlats.shift()
}

allPianoSharps = allPianoFlats.slice().map(noteStr => {
    let newStr = noteStr
    if(noteStr[1] == "b"){
        if(noteStr[0] == "A"){
            newStr = "G#" + noteStr[2]
        }
        if(noteStr[0] == "B"){
            newStr = "A#" + noteStr[2]
        }
        if(noteStr[0] == "C"){
            newStr = "B" + String(parseInt(noteStr[2]) - 1)
        }
        if(noteStr[0] == "D"){
            newStr = "C#" + noteStr[2]
        }
        if(noteStr[0] == "E"){
            newStr = "D#" + noteStr[2]
        }
        if(noteStr[0] == "G"){
            newStr = "F#" + noteStr[2]
        }
    }
    return newStr
})

function blinkNote(noteName){
    const pianoKey = document.querySelector(`#${noteName}`)
    pianoKey.style.backgroundColor = "gold"
    pianoKey.style.boxShadow = "0px 0px 10px 1px gold"
    if(pianoKey.classList.contains("black-key")){
        setTimeout(()=>{
            pianoKey.style.backgroundColor = "black"
            pianoKey.style.boxShadow = "0px 0px 0px 0px gold"
        },500)
    }
    else{
        setTimeout(()=>{
            pianoKey.style.backgroundColor = "whitesmoke"
            pianoKey.style.boxShadow = "0px 0px 0px 0px gold"
        },500)
    }
}

function playNoteAudio(fileName){
    const noteAudio = new Audio(fileName)
    noteAudio.volume = 0.3
    noteAudio.play()
}

function playNote(sharpNoteName,octave,duration){
    const fileName = 'note-audio/' + (sharpNoteName + String(octave)).replace("#","s") + '.mp3'
    playNoteAudio(fileName)
    const backToFlat = new Note(sharpNoteName).enharmonic()
    blinkNote(backToFlat.name + String(octave))
}

eyes = Array.from(document.querySelectorAll('.eye'))
teeth = Array.from(document.querySelectorAll('.tooth'))
function lightFace(){
    eyes.forEach(eye => {
        eye.style.backgroundColor = "red"
        setTimeout(()=> eye.style.backgroundColor = "blue",500)
        setTimeout(()=> eye.style.backgroundColor = "gold",1000)
    })
    teeth.forEach(tooth => {
        tooth.style.backgroundColor = "cyan"
        setTimeout(()=>tooth.style.backgroundColor = "green",500)
        setTimeout(()=>tooth.style.backgroundColor = "magenta",1000)
    })
    if(playing){
        setTimeout(lightFace,600);
    }
}

const playButton = document.querySelector("#play")
function startPlaying(){
    if(!playing){
        satbImprovise(1,startingNote,harmonizedStartingNote)
        playButton.innerHTML = 'STOP'
        playing = true
        stoppingTime = false
        lightFace()
    }
    else{
        playButton.innerHTML = 'PLAY'
        stoppingTime = true
        playing = false
        eyes.forEach(eye => {
            setTimeout(()=>eye.style.backgroundColor = "black",650)
        })
        teeth.forEach(tooth => {
            setTimeout(()=>tooth.style.backgroundColor = "black",650)
        })
    }
}

//playButton.addEventListener('click',startPlaying)

window.addEventListener('keyup',startPlaying)