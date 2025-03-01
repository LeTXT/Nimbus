const day: Date = new Date()

export const arrayDay: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
export const arrayDate: number[] = []

export const getDaysDate = (set: React.Dispatch<React.SetStateAction<number[]>>) => {
    
    const today = new Date(); 
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDate() - firstDayOfMonth.getDay();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < arrayDay.length; i++) {
        let calculatedDay = firstDayOfWeek + i;
        
        if (calculatedDay <= 0){
            const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
            calculatedDay = lastDayOfPreviousMonth + calculatedDay;
        }

        if (calculatedDay > lastDayOfMonth) {
            calculatedDay -= lastDayOfMonth;
        }

        days.push(calculatedDay);
    }
    set(days);
    
}


export const featuredToday = (index: number) => index == day.getDay() ? 'day-date today' : 'day-date'