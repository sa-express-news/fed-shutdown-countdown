import { CountdownObject } from './types';

const shutdownCountdown = (): void => {

    const createCountdownObject = (cutoffTime: Date): CountdownObject => {
        const MILLISECONDS_IN_DAY = 86400000;
        const MILLISECONDS_IN_HOUR = 3600000;
        const MILLISECONDS_IN_MINUTE = 60000;
        const MILLISECONDS_IN_SECOND = 1000;

        const now = new Date();
        let remainingTime = cutoffTime.getTime() - now.getTime();

        const differenceInDays = Math.floor(remainingTime / MILLISECONDS_IN_DAY);

        remainingTime -= differenceInDays * MILLISECONDS_IN_DAY;

        const differenceInHours = Math.floor(remainingTime / MILLISECONDS_IN_HOUR);

        remainingTime -= differenceInHours * MILLISECONDS_IN_HOUR;

        const differenceInMinutes = Math.floor(remainingTime / MILLISECONDS_IN_MINUTE);

        remainingTime -= differenceInMinutes * MILLISECONDS_IN_MINUTE;

        const differenceInSeconds = Math.floor(remainingTime / MILLISECONDS_IN_SECOND);

        remainingTime -= differenceInSeconds * MILLISECONDS_IN_SECOND;

        return {
            days: differenceInDays,
            hours: differenceInHours,
            minutes: differenceInMinutes,
            seconds: differenceInSeconds

        };
    }

    const midnightEastern = new Date(Date.UTC(2018, 0, 20, 5));

    if (new Date() > midnightEastern) {
        const container = document.querySelector('div#shutdown-countdown');
        container.parentElement.removeChild(container);
    } else {
        const countdownObject = createCountdownObject(midnightEastern);

        const setClock = (countdown: CountdownObject): void => {
            const clock = document.querySelector('div#shutdown-countdown>div>p.time');
            const days = clock.querySelector('.days');
            const hours = clock.querySelector('.hours');
            const minutes = clock.querySelector('.minutes');
            const seconds = clock.querySelector('.seconds');

            days.textContent = countdownObject.days > 0 ? countdown.days.toString() : '';
            hours.textContent = addLeadingZeroIfNecessary(countdown.hours) + " :";
            minutes.textContent = addLeadingZeroIfNecessary(countdown.minutes) + " :";
            seconds.textContent = addLeadingZeroIfNecessary(countdown.seconds);


            function addLeadingZeroIfNecessary(number: number) {
                const numberAsString = number.toString();
                if (numberAsString.length === 1) {
                    return `0${numberAsString}`;
                } else {
                    return numberAsString;
                }
            }
        }

        setClock(countdownObject);

        window.setInterval(() => {
            const countdownObject = createCountdownObject(midnightEastern);
            setClock(countdownObject);
        }, 1000);
    }
}

shutdownCountdown();