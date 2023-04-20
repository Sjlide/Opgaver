const gallery = (function () { // IFFE ELLER LUKNINGEN
    const TEXT_CONTAINER = document.querySelector(".text")
    const GALLERY = document.querySelector(".gallery__container") // TAGER FAT I VORES DIV HVOR BILLEDERNE SKAL LIGGE I
    const FOCUSED_IMAGES = document.createElement("img") // LAVER IMG TAGGET I HTML SÅ DET VALGTE BILLEDE VISES
    FOCUSED_IMAGES.classList.add("gallery__focusedImage") // LAVER EN CLASS TIL VORES IMG TAG

    const TEXT = document.createElement("div")
    TEXT.classList.add("info__text")

    function createText(text) {
        const PTAGGET = document.createElement("p")
        PTAGGET.innerHTML = "Roll over images to zoom in"
        PTAGGET.classList.add("main__text")
        TEXT.append(PTAGGET)
        TEXT_CONTAINER.append(TEXT)
    }

    const THUMBNAILS = document.createElement("div") // LAVER EN DIV
    THUMBNAILS.classList.add("gallery__thumbnails") // LAVER EN CLASS TIL VORES DIV TAG


    function buildThumbnail(image) { // REFERERER TIL VORES CONST THUMBNAILS OG LAVER ÆNDRINGER TIL DE SMÅ BILLEDER.
        const BUTTON = document.createElement("button") // LAVER EN BUTTON.
        BUTTON.addEventListener("mouseover", changeFocus) // LAVER EN LYTTER TIL KNAPPEN SOM SKIFTER SKIFTER FOCUS PÅ BILLEDE MED ET "CLICK"
        BUTTON.innerHTML = `<img src="${image}" alt="gallery miniature" class="gallery__thumbnail">` // LAVER INNERHTML ELLER TEKSTEN OM PÅ BUTTON / LAVER KNAPPEN TIL ET BILLEDE.
        BUTTON.classList.add("gallery__button") // LAVER EN CLASS TIL VORES BUTTONS
        THUMBNAILS.append(BUTTON) //
    }


    function changeFocus(event) {
        FOCUSED_IMAGES.src = event.target.src // NÅR DU EN TRYKKER PÅ KNAPPEN MED BILLEDE PÅ BLIVER DEN VIST.
    }


    function init(images = []) {
        FOCUSED_IMAGES.src = images[0]
        images.forEach(buildThumbnail)
        GALLERY.append(FOCUSED_IMAGES, THUMBNAILS, ZOOMED_IMAGE_DIV)
        createText()

    }

    const ZOOMED_IMAGE_DIV = document.createElement("div")
    const ZOOMED_IMAGE = document.createElement("img")
    ZOOMED_IMAGE_DIV.append(ZOOMED_IMAGE)
    ZOOMED_IMAGE_DIV.style.display="none"
    ZOOMED_IMAGE_DIV.classList.add("gallery__zoomedImageContainer")
    ZOOMED_IMAGE.classList.add("gallery__zoomedImage") 

    FOCUSED_IMAGES.addEventListener("mouseover", zoom)    
    
    function zoom (event){
        //Flere mouse-eventlyttere. Hvis vi tilføjer
        //lyttere inde i en funktion som trigges igen og igen
        //er det god praksis at fjerne dem igen.
        //det gør vi i stopZoom() 
        FOCUSED_IMAGES.addEventListener("mousemove", move)
        FOCUSED_IMAGES.addEventListener("mouseout", stopZoom)
        ZOOMED_IMAGE.src = event.target.src
        ZOOMED_IMAGE_DIV.style.display="block"    
    }
    function move(event){
        //Musens position i forhold til hele viduet
        let mouseX = event.clientX
        let mouseY = event.clientY
        //getBound.. returerer propperties om selve elementets position 
        let rect = event.target.getBoundingClientRect()
        //Med lidt matematik kan vi nu få musens position relativ til billedet
        posX = mouseX - rect.left
        posY = mouseY - rect.top
        ZOOMED_IMAGE.style.transformOrigin = `${posX}px ${posY}px`
    }
    function stopZoom(){
        ZOOMED_IMAGE_DIV.style.display="none"
        //Oprydning og rengøring
    }









    return {
        init
    }


})()





