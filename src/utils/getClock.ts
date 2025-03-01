export const setClock = (setHours: React.Dispatch<React.SetStateAction<string>>, setSeconds: React.Dispatch<React.SetStateAction<string>>) => {
    const clock: Date = new Date()
    const hours = clock.getHours()
    const minutes = clock.getMinutes()
    const seconds = clock.getSeconds()

    setHours(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    setSeconds(`${seconds.toString().padStart(2, '0')}`)
}