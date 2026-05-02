console.log("hello from index.js");

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")//promiss for response
        .then((res) => res.json())// promiss for json data
        .then((json) => displayLessons(json.data)); // we can do this thing in different function console.log(json.data[2].lessonName)
}


const loadWords = (level, event) => {

    //changing clicked button color logic
    const levelBtns = document.getElementsByClassName("level-btn");
    for (let btn of levelBtns) {
        btn.classList.remove("btn-active");
    }
    event.target.classList.add("btn-active");

    //fetching word data logic
    fetch(`https://openapi.programming-hero.com/api/level/${level}`) //dynamic url
        .then((res) => res.json())
        .then((json) => displayWordCards(json.data));
}


const displayWordCards = (words) => {

    // 1.get the Selection and empty it
    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerHTML = "";

    if (words.length == 0) {
        wordsContainer.innerHTML =
            `
                <div class=" col-span-full text-center flex flex-col py-3.5 space-y-4">
                    <div class="flex justify-center">
                        <img src="./assets/alert-error.png" alt="">
                    </div>
                    <p class="text-2xl">No Vocabulary has been added in this Lesson</p>
                    <h2 class="font-bold text-4xl">Please go to Next Lesson</h2>
                </div>
            `;
    }

    words.forEach(element => {
        const card = document.createElement("div");
        card.innerHTML =
            `
                <div class="card bg-white items-center shadow-sm py-15 space-y-4">
                    <h2 class="font-bold text-2xl">${(element.word) ? element.word : "Word Not Found"}</h2>
                    <p class="">${(element.pronunciation) ? element.pronunciation : "Pronounciation Not Found"}</p>
                    <div class="text-2xl">${(element.meaning) ? element.meaning : "Meaning Not Found"}</div>
                    <div class="flex justify-between w-full px-4">
                        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>

            `;

        wordsContainer.append(card);
    });


}

const displayLessons = (lessons) => {
    // 1.get the parent and empty it
    const levelContainer = document.getElementById("level-container");
    // 2.get all the level by looping
    for (let lesson of lessons) {
        //     1.create Element
        const levelBtn = document.createElement("div");
        levelBtn.innerHTML = `
                <button onclick="loadWords(${lesson.level_no},event)" class="btn level-btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>
                Lesson-${lesson.level_no}
                </button>
        `;
        //     2.append element
        levelContainer.append(levelBtn);
    }

}

loadLessons();



/* <div class="card bg-white items-center shadow-sm py-15 space-y-4">
    <h2 class="font-bold text-2xl">Eager</h2>
    <p class="">Meaning /Pronounciation</p>
    <div class="text-2xl">"আগ্রহী / ইগার"</div>
    <div class="flex justify-between w-full px-4">
        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
    </div>
</div>*/