const oneOrNeg = [-1,1]
const intvls = [1,2]
const randToggle = [0,1]
function randMelNote(prevNote){
    const prevNoteIndex = allPianoSharps.indexOf(prevNote.name + String(prevNote.octave))
    let randDirection
    let randIntvl
    if(prevNote.name == keyInSharps[6].name){
        randDirection = 1
        randIntvl = 1
    }
    else{
        randIntvl = intvls[Math.round(Math.random() * 1)]
        if(prevNote.octave < 4){
            randDirection = 1
        }
        else if(prevNote.octave > 5){
            const steepUpHill = [-1,-1,-1,1]
            randDirection = steepUpHill[Math.round(Math.random() * 3)]
        }
        else{
            randDirection = oneOrNeg[Math.round(Math.random() * 1)]
        }
    }
    const newNoteStr = allPianoSharps[prevNoteIndex + randDirection * randIntvl]
    let octave = newNoteStr[newNoteStr.length - 1]
    const name = newNoteStr.replace(octave,"")
    octave = parseInt(octave)
    randNeighbor = randToggle[Math.round(Math.random() * 1)]
    if(randNeighbor){
        const neighbor = allPianoSharps[prevNoteIndex + randDirection * randIntvl + oneOrNeg[Math.round(Math.random() * 1)]]
        let neighborOctave = neighbor[neighbor.length - 1]
        let neighborName = neighbor.replace(neighborOctave,"")
        neighborOctave = parseInt(neighborOctave)
        playNote(name,octave,0.5)
        setTimeout(()=>playNote(neighborName,neighborOctave,0.5),220)
        setTimeout(()=>playNote(name,octave,0.5),440)
    }
    else{
        playNote(name,octave,1)
    }
    playNote(name,octave,1)
    return new Note(name,octave)
}

const thirdSixth = [2,5]
function randHarmNote(prevIndexIntvl,noteAgainst,prevHarmIndex){
    const noteAgainstIndex = allPianoSharps.indexOf(noteAgainst.name + String(noteAgainst.octave))
    if(!prevIndexIntvl){
        const intvls = [2,4,7]
        const randIndex = intvls[Math.round(Math.random() * 2)]
        const newNoteStr = allPianoSharps[noteAgainstIndex + randIndex]
        const octave = newNoteStr[newNoteStr.length - 1]
        const name = newNoteStr.replace(octave,"")
        return new Note(name,parseInt(octave))
    }
    else {
        let intvls = [2,2,2,3,4,5,5,7]
        if(prevIndexIntvl == 4){
            intvls = [2,2,2,3,5,5,5,7]
        }
        else if(prevIndexIntvl == 8){
            intvls = [2,2,2,3,4,5,5,5]
        }
        const randIndex = noteAgainstIndex - intvls[Math.round(Math.random() * 7)]
        const newNoteStr = allPianoSharps[randIndex]
        let octave = newNoteStr[newNoteStr.length - 1]
        const name = newNoteStr.replace(octave,"")
        octave = parseInt(octave)
        const randNeighbor = randToggle[Math.round(Math.random() * 1)]
        if(randNeighbor){
            const neighbor = allPianoSharps[randIndex + oneOrNeg[Math.round(Math.random() * 1)]]
            let neighborOctave = neighbor[neighbor.length - 1]
            let neighborName = neighbor.replace(neighborOctave,"")
            neighborOctave = parseInt(neighborOctave)
            playNote(name,octave,0.5)
            setTimeout(()=>playNote(neighborName,neighborOctave,0.5),220)
            setTimeout(()=>playNote(name,octave,0.5),440)
        }
        else{
            playNote(name,octave,1)
        }
        return new Note(name,octave)
    }
}

function randVoice3(topVoicesIndexIntvl,noteAgainstIndex){
    let newIndex
    let intvls
    if(topVoicesIndexIntvl == 2){
        intvls = [2,5]
        newIndex = noteAgainstIndex - intvls[Math.round(Math.random() * 1)]
    }
    else if(topVoicesIndexIntvl == 3){
        newIndex = noteAgainstIndex - 2
    }
    else if(topVoicesIndexIntvl == 4){
        newIndex = noteAgainstIndex - 5
    }
    else if(topVoicesIndexIntvl == 5){
        intvls = [2,4]
        newIndex = noteAgainstIndex - intvls[Math.round(Math.random() * 1)]
    }
    else if(topVoicesIndexIntvl == 7){
        intvls = [-2,2,5]
        newIndex = noteAgainstIndex - intvls[Math.round(Math.random() * 2)]
    }
    const newNoteStr = allPianoSharps[newIndex]
    let octave = newNoteStr[newNoteStr.length - 1]
    const name = newNoteStr.replace(octave,"")
    octave = parseInt(octave)
    const randNeighbor = randToggle[Math.round(Math.random() * 1)]
    if(randNeighbor){
        const neighbor = allPianoSharps[newIndex + oneOrNeg[Math.round(Math.random() * 1)]]
        let neighborOctave = neighbor[neighbor.length - 1]
        let neighborName = neighbor.replace(neighborOctave,"")
        neighborOctave = parseInt(neighborOctave)
        playNote(name,octave,0.5)
        setTimeout(()=>playNote(neighborName,neighborOctave,0.5),220)
        setTimeout(()=>playNote(name,octave,0.5),440)
    }
    else{
        playNote(name,octave,1)
    }
    return new Note(name,octave)
}

function randVoice4(midVoicesIndexIntvl,topVoicesIndexIntvl,noteAgainstIndex){
    let newIndex
    let intvls
    if(topVoicesIndexIntvl == 2){
        if(midVoicesIndexIntvl == 2){
            newIndex = noteAgainstIndex - 7
        }
        else{
            newIndex = noteAgainstIndex - 2
        }
    }
    else if(topVoicesIndexIntvl == 3){
        newIndex = noteAgainstIndex - 2
    }
    else if(topVoicesIndexIntvl == 4){
        newIndex = noteAgainstIndex - 2
    }
    else if(topVoicesIndexIntvl == 5){
        intvls = [2,3]
        newIndex = noteAgainstIndex - intvls[Math.round(Math.random() * 1)]
    }
    else if(topVoicesIndexIntvl == 7){
        if(midVoicesIndexIntvl == 5){
            intvls = [2,4]
            newIndex = noteAgainstIndex - intvls[Math.round(Math.random() * 1)]
        }
        else{
            newIndex = noteAgainstIndex - 2
        }
    }
    const newNoteStr = allPianoSharps[newIndex]
    let octave = newNoteStr[newNoteStr.length - 1]
    const name = newNoteStr.replace(octave,"")
    octave = parseInt(octave)
    const randNeighbor = randToggle[Math.round(Math.random() * 1)]
    /*if(randNeighbor){
        const neighbor = allPianoSharps[newIndex + oneOrNeg[Math.round(Math.random() * 1)]]
        let neighborOctave = neighbor[neighbor.length - 1]
        let neighborName = neighbor.replace(neighborOctave,"")
        neighborOctave = parseInt(neighborOctave)
        playNote(name,octave,0.5)
        setTimeout(()=>playNote(neighborName,neighborOctave,0.5),500)
        setTimeout(()=>playNote(name,octave,0.5),1000)
    }
    else{
        playNote(name,octave,1)
    }*/
    playNote(name,octave,1)
    return new Note(name,octave)
}

const startingNote = keyInSharps[0] // str
const harmonizedStartingNote = randHarmNote(null,startingNote)

//Reminders: Element ID's need flats
//           playNote needs sharps

let prevIndexIntvl = allPianoSharps.indexOf(startingNote.name + String(startingNote.octave)) - allPianoSharps.indexOf(harmonizedStartingNote.name + String(harmonizedStartingNote.octave))
let voice2Index
let stoppingTime = false
let playing = false
function satbImprovise(i,prevNote,prevHarmNote){
    let voice1 = prevNote
    let voice2 = prevHarmNote
    if(i == 1){
        playNote(prevNote.name,prevNote.octave,1)
        playNote(prevHarmNote.name,prevHarmNote.octave,1)
    }
    else if(i == 300 || stoppingTime){
        return
    }
    else {
        voice1 = randMelNote(prevNote)
        voice2 = randHarmNote(prevIndexIntvl,voice1,voice2Index)
        const voice1Index = allPianoSharps.indexOf(voice1.name + String(voice1.octave))
        voice2Index = allPianoSharps.indexOf(voice2.name + String(voice2.octave))
        const topVoicesIndexIntvl = voice1Index - voice2Index
        const voice3 = randVoice3(topVoicesIndexIntvl,voice2Index)
        const voice3Index = allPianoSharps.indexOf(voice3.name + String(voice3.octave))
        const midVoicesIndexIntvl = voice2Index - voice3Index
        const voice4 = randVoice4(midVoicesIndexIntvl,topVoicesIndexIntvl,voice3Index)
    }
    setTimeout(() => satbImprovise(i + 1,voice1,voice2),660)
}