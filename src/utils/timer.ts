export const handleScroll = (
    container: React.MutableRefObject<HTMLDivElement | null>,
    element:HTMLInputElement, 
    set:React.Dispatch<React.SetStateAction<number>>, 
    alarmRef: React.MutableRefObject<number | null>) => {
    
    if(alarmRef.current !== null) clearInterval(alarmRef.current)
    if (container.current) { 
        container.current.classList.remove('alarm')
    }

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
        
    }

    set(selectedNumber)
};

export const handleInfiniteScroll = (element: HTMLInputElement) => {   

    const itemHeight = (element.children[0] as HTMLElement).offsetHeight ;

    if (element.scrollTop <= 0) {
        const lastItem = element.lastElementChild ;
        if (lastItem) {
            element.insertBefore(lastItem, element.firstElementChild);
            element.scrollTop = itemHeight;
        }
    }

    
    if(element.scrollTop >= element.scrollHeight - element.clientHeight - 15) {
        const items = element.children
        const firstItem = items[0]

        element.removeChild(firstItem)
        element.appendChild(firstItem)
       
        setTimeout(() => {
            element.scrollTop -= itemHeight - 94
        }, 1)
        
    }          
}


export const handleScrollPlay = (
    container: React.MutableRefObject<HTMLDivElement | null>,
    tensElement: HTMLInputElement | null, 
    unitElement: HTMLInputElement | null, 
    secondsTens: number, 
    secondsDigit : number, 
    intervalRef: React.MutableRefObject<number | null>,
    setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>, 
    audios: HTMLAudioElement, 
    tic: HTMLAudioElement,
    alarmRef: React.MutableRefObject<number | null>
) => {

    if (!tensElement || !unitElement) return

    let tens = secondsTens;
    let unit = secondsDigit;
    let count: number = 0
    const maxPlays = 3

    if (intervalRef.current !== null) {
        clearInterval(intervalRef.current) 
        intervalRef.current = null;
        setIsTimerRunning(false)
        return;
    }

    if (tens === 0 && unit === 0) return;
    
    setIsTimerRunning(true)

    const updateScroll = () => {
        
        if (tens === 0 && unit === 0) {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current) 
                intervalRef.current = null;
                setIsTimerRunning(false)

                audios.play()
                if (container.current) {
                    container.current.classList.add('alarm')
                }

                alarmRef.current = setInterval(() => {
                    audios.play()

                    count++
                    
                    if (count >= maxPlays) { 
                        if(alarmRef.current !== null) clearInterval(alarmRef.current)
                        if (container.current) {
                            container.current.classList.remove('alarm')
                        }
                    }

                }, 3000)
                return;
            }

        }
        if (unit > 0) {
            unitElement.scrollTo({top: unitElement.scrollTop - 81, behavior: 'smooth'})

            unit--

            tic.pause()
            tic.play()
            return
        }
        if (unit === 0 && tens > 0) {
            tensElement.scrollTo({top: tensElement.scrollTop - 81, behavior: 'smooth'})
            unitElement.scrollTo({top: unitElement.scrollTop - 81, behavior: 'smooth'})

            tens--
            unit = 9

            tic.pause()
            tic.play()
            return
        }
    }
        
    intervalRef.current = window.setInterval(updateScroll, 1000)  
}