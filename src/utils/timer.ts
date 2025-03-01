

export const handleScroll = (element:HTMLInputElement, set:React.Dispatch<React.SetStateAction<number>>) => {
    
    const offset = 35;
    const scrollTop = element.scrollTop

    let selectedNumber: number = 0

    const pContainers = element.querySelectorAll<HTMLElement>('.pContainer')

    pContainers.forEach((fDiv, index) => {
    
        const baseHeight: number = fDiv.offsetHeight

        const minScroll = (index - 1) * baseHeight + offset
        const maxScroll = index * baseHeight + offset 
    
        if (scrollTop > minScroll && scrollTop <= maxScroll) {
            element.scrollTo({top: baseHeight * index, behavior: 'smooth'})

            const numberTake: number = parseInt(`${fDiv?.querySelector("p")?.textContent || 0}`)
        
            selectedNumber = numberTake
        }
    })

    if (scrollTop <= offset) {
        element.scrollTo({ top: 0, behavior: "smooth" });
        selectedNumber = 0;

        console.log('opa');
        
    }

    set(selectedNumber)
};

export const handleInfiniteScroll = (element: HTMLInputElement) => {
    if(element.scrollTop <= 15) {
        const items: HTMLCollection = element.children
        const lastItem = items[items.length -1]

        element.removeChild(lastItem)
        element.insertBefore(lastItem, items[0])
        
       
        element.scrollTop = element.children[0].offsetHeight
      
    }

    if(element.scrollTop >= element.scrollHeight - element.clientHeight - 15) {
        const items = element.children
        const firstItem = items[0]

        element.removeChild(firstItem)
        element.appendChild(firstItem)
       
        element.scrollTop -= firstItem.offsetHeight - 94
    }           
}


export const handleScrollPlay = (
    tensElement: HTMLInputElement | null, 
    unitElement: HTMLInputElement | null, 
    secondsTens: number, secondsDigit : number, 
    intervalRef: React.MutableRefObject<number | null>,
    setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>, audios: HTMLAudioElement
) => {

    if (!tensElement || !unitElement) return

    let tens = secondsTens;
    let unit = secondsDigit;

    if (intervalRef.current !== null) {
        clearInterval(intervalRef.current) 
        intervalRef.current = null;
        setIsTimerRunning(false)
        return;
    }
    if (tens === 0 && unit === 0) return;
    
    setIsTimerRunning(true)

    const updateScroll = () => {
        console.log(tens, unit);
        
        if (tens === 0 && unit === 0) {
            if(intervalRef.current !== null) {
                clearInterval(intervalRef.current) 
                intervalRef.current = null;
                setIsTimerRunning(false)
                audios.play()
                return;
            }

        }
        if (unit > 0) {
            unitElement.scrollTo({top: unitElement.scrollTop - 81, behavior: 'smooth'})

            unit--
            return
        }
        if (unit === 0 && tens > 0) {
            tensElement.scrollTo({top: tensElement.scrollTop - 81, behavior: 'smooth'})
            unitElement.scrollTo({top: unitElement.scrollTop - 81, behavior: 'smooth'})

            tens--
            unit = 9
            return
        }
    }
        
    intervalRef.current = window.setInterval(updateScroll, 1000)  
}