const dateDay: Date = new Date()

export const arrayDay: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
export const arrayDate: number[] = []

export const getDaysDate = (set: React.Dispatch<React.SetStateAction<number[]>>) => {
    
    const getCurrentMonth = new Date(dateDay.getFullYear(), dateDay.getMonth() + 1, 0)
    const getLastMonth = new Date(dateDay.getFullYear(), dateDay.getMonth(), 0)
    const getAfterMonth = new Date(dateDay.getFullYear(), dateDay.getMonth() + 1)

    const getSunday = dateDay.getDate() - dateDay.getDay()
    
    const days: number[] = []
    
    for (let i = 0; i < arrayDay.length; i++) {
        
        if (getSunday + i <= 0) {
            if (getLastMonth.getDate() + (getSunday + i) <= getLastMonth.getDate()) {
                days[i] = getLastMonth.getDate() + (getSunday + i)

            }
            else {
                days[i] = dateDay.getDate() + (getSunday + (i - 1))
                
            }
        }
        if (getSunday + i > getCurrentMonth.getDate()) {
            days[i] = getAfterMonth.getDate() + (i - getAfterMonth.getDay())

        }
        if (getSunday + i > 0 && getSunday + i <= getCurrentMonth.getDate()) {
            days[i] = getSunday + i

        }
    }
    
    set(days);
}


export const featuredToday = (index: number) => index == dateDay.getDay() ? 'day-date today' : 'day-date'


// if(dateDay.getDate() + i > 0) {
        //     days[dateDay.getDay() + i] = dateDay.getDate() + i

        // }
        // if (dateDay.getDate() - i <= 0) {
        //     if (dateDay.getDate() - i === 0) days[getLastMonth.getDay()] = getLastMonth.getDate()
        //     days[getLastMonth.getDay() - i] = getLastMonth.getDate() - i

        // }
        
        // days[dateDay.getDay() + i] = dateDay.getDate() + i
        // if(today.getDay() >= 0) {
        //     days[today.getDay() + i] = today.getDate() + i
        // }
        // if((dateDay.getDay() + i) - (arrayDay.length - 1) === 0) {
        //     days[0] = 1
        // }

        // lembrando que o primeiro i é igual a zero
        // if  (dateDay.getDay() + i === 0) {
        //     days[dateDay.getDay() + i] = dateDay.getDate() + i
        // }
        // if (dateDay.getDay() + i > getCurrentMonth.getDay()) {
        //     days[getAfterMonth.getDay() + i] = getAfterMonth.getDate()
        // }
        
        // // verifica se a data atual (em numero) é maior que 0 mesmo diminuindo o valor por i
        // if (dateDay.getDate() - i > 0) days[dateDay.getDay() - i] = dateDay.getDate() - i
        // // verifica se caso diminua o valor da data o número da data vai ser zero, se sim, pega o ultimo dia do mês anterior e subtrai
        // if (dateDay.getDate() - i <= 0) {
        //     if (dateDay.getDate() - i === 0) days[getLastMonth.getDay()] = getLastMonth.getDate()
        //     days[getLastMonth.getDay() - i] = getLastMonth.getDate() - i
            
        // }
        // // verifica se a soma da data com i é maior que o do mês atual
        // if (dateDay.getDate() + i + 1 > getCurrentMonth.getDate()) days[getAfterMonth.getDay() + i] = getAfterMonth.getDate() + i
        // else {
        //     days[dateDay.getDay() + i] = dateDay.getDate() + i
        // }