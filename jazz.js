const negToggle = [-1,1]

function blinkNote(noteName){
    const pianoKey = document.getElementById(noteName)
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

function playNote(sharpNoteName,duration){
    sharpNoteName = sharpNoteName.replace("#","s")
    const fileName = 'note-audio/' + sharpNoteName + '.mp3'
    playNoteAudio(fileName)
    blinkNote(sharpNoteName)
    return sharpNoteName
}

const allPianoNotes = Array.from(document.querySelectorAll('.white-key')).concat(Array.from(document.querySelectorAll('.black-key'))).map(el => el.id)

//I AM PROUD OF THIS NOTE SORTER BY CORRECT OCTAVES: DON'T FORGET THIS, ME:
allPianoNotes.sort((a,b) => {
    const octaveNumA = parseInt(a[a.length - 1])
    const octaveNumB = parseInt(b[b.length - 1])
    const aIsSharp = a[1] == "s"
    const aLetter = a[0]
    const bLetter = b[0]
    if(octaveNumA > octaveNumB){
        return 1
    }
    else if(octaveNumA < octaveNumB){
        return -1
    }
    else{
        if(aLetter == "A" && bLetter !="B" && bLetter != "A"){
            return 1
        }
        else if(aLetter == "B"){
            return 1
        }
        else if(bLetter == "B"){
            return -1
        }
        else if(aLetter != "B" && aLetter !="A" && bLetter == "A"){
            return -1
        }
        else if(aLetter > bLetter){
            return 1
        }
        else if(aLetter < bLetter){
            return -1
        }
        else{
            if(aIsSharp){
                return 1
            }
            else{
                return -1
            }
        }
    }
})

const chordProgression = [
    new Chord(new Note("F"),"minor7","minor"),
    new Chord(new Note("Eb"),"dom7","mixolydian"),
    new Chord(new Note("Db"),"major7","lydian"),
    new Chord(new Note("C"),"minor7","phrygian"),
]

const masterTempo = new Tempo(200)
const secondsPerBeat = masterTempo.beatLenS
const millisecondsPerBeat = masterTempo.beatLenMs
const swingEigthsMs = [millisecondsPerBeat / 1.6,millisecondsPerBeat - millisecondsPerBeat / 1.6]
const halfMs = millisecondsPerBeat * 2

//const bassOctaveChance = [3,3,3,2]
const stepsTypeChance = ["chromaticSteps","jazzChromaticSteps","arpeggioSteps1","arpeggioSteps2"]
function playHarmony(harmonicRhythmMS){
    let i = 0
    chordProgression.forEach(chord => {
        const rootName = chord.rootNote.enharmonic("#").name.replace("#","s")
        //const rootOctave = bassOctaveChance[Math.round(Math.random() * 3)]
        const rootOctave = 2
        const rootIndex = allPianoNotes.indexOf(rootName + rootOctave)
        const stepsToUse = chord[stepsTypeChance[Math.round(Math.random() * 1)]]
        let prevMelNote = rootName + rootOctave
        setTimeout(()=> {
            playNote(rootName + rootOctave)
            //prevMelNote = runDiatonicEighthsHalf(chord.mode,prevMelNote)
            //if(Math.round(Math.random() * 1)){
            if(true){
                arpeggiate(chord)
            }
            else{
                runDiatonicEighthsHalf(chord.mode)
            }
            stepsToUse.forEach(step => {
                const chordTone = allPianoNotes[rootIndex + step + 12]
                setTimeout(()=>playNote(chordTone),halfMs / 2)
            })
        },halfMs * i)
        i++
    })
}

const diatonicStartingNotesChance = [0,2,4]
const leapOrNot = [1,1,2]
function runDiatonicEighthsHalf(mode,prevNoteName){
    prevNoteName = prevNoteName || null
    let startingNote
    let i = 0
    let startingModeIndex
    let startingNoteName
    let startingNoteIndex
    if(prevNoteName){
        startingModeIndex = diatonicStartingNotesChance[Math.round(Math.random() * 2)]
        startingNoteName = mode.spelling[startingModeIndex].enharmonic("#").name.replace("#","s") + "6"
        startingNoteIndex = allPianoNotes.indexOf(startingNoteName)
    }
    else{
        startingModeIndex = diatonicStartingNotesChance[Math.round(Math.random() * 3)]
        startingNoteName = mode.spelling[startingModeIndex].enharmonic("#").name.replace("#","s") + "6"
        startingNoteIndex = allPianoNotes.indexOf(startingNoteName)
    }
    let prevIndex = startingNoteIndex
    let prevModeIndex = startingModeIndex
    let prevBeatLen = 0
    let beatLen
    let newNoteName
    let newNotesAfterRoot = []
    playNote(startingNoteName)
    for(n = 0; n < 3;n++){
        beatLen = swingEigthsMs[n % 2 == 1 ? 1:0 ] + prevBeatLen
        const randDirection = negToggle[Math.round(Math.random() * 1)]
        const step = leapOrNot[Math.round(Math.random() * 2)] * randDirection
        let newModeIndex = prevModeIndex + step
        if(newModeIndex >= mode.spelling.length){
            newModeIndex -= mode.spelling.length
        }
        else if(newModeIndex < 0){
            newModeIndex += mode.spelling.length
        }
        newNoteName = mode.spelling[newModeIndex].enharmonic("#").name.replace("#","s")
        const oct3Index = allPianoNotes.indexOf(newNoteName + "3")
        const oct4Index = allPianoNotes.indexOf(newNoteName + "4")
        const oct5Index = allPianoNotes.indexOf(newNoteName + "5")
        if(Math.abs(prevIndex - oct3Index) < Math.abs(prevIndex - oct4Index) && Math.abs(prevIndex - oct3Index) < Math.abs(prevIndex - oct5Index)){
            newNoteName += "3"
        }
        else if(Math.abs(prevIndex - oct5Index) < Math.abs(prevIndex - oct3Index) && Math.abs(prevIndex - oct5Index) < Math.abs(prevIndex - oct4Index)){
            newNoteName += "5"
        }
        else {
            newNoteName += "4"
        }
        prevModeIndex = newModeIndex
        prevIndex += step
        prevBeatLen = beatLen
        newNotesAfterRoot.push([newNoteName,prevBeatLen])
        // setTimeout(()=>{
        //     playNote(newNoteName)
        // },prevBeatLen)
    }
    newNotesAfterRoot.forEach(note => {
        setTimeout(()=>{
            playNote(note[0])
        },note[1])
    })
    return newNoteName
}

function arpeggiate(chord){
    let stepsToUse = chord[stepsTypeChance[Math.round(Math.random() * 1) + 2]]
    //stepsToUse = stepsToUse.reverse() // for now
    const chordRootIndex = allPianoNotes.indexOf(chord.rootNote.enharmonic("#").name.replace("#","s") + "5")
    let notesToPlay = []
    let prevBeatLen = 0
    let beatLen
    let n = 0
    // if(Math.round(Math.random() * 1)){
    //     stepsToUse = stepsToUse.reverse()
    // }
    stepsToUse.forEach(step => {
        beatLen = n == 0 ? 0:swingEigthsMs[n % 2 == 0 ? 1:0] + prevBeatLen
        prevBeatLen = beatLen
        notesToPlay.push([allPianoNotes[chordRootIndex + step],prevBeatLen])
        n++
    })
    console.log(stepsToUse,notesToPlay)
    notesToPlay.forEach(note => {
        setTimeout(()=>{
            playNote(note[0])
        },note[1])
    })
}

window.addEventListener('click',()=>{
    playHarmony()
    setTimeout(playHarmony,millisecondsPerBeat * 8)
})
window.addEventListener('keyup',()=>runDiatonicEighthsHalf(new Mode("F","major")))