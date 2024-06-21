import $ from 'jquery'

$(document).ready(function() {
    const $paragraph = $('#win');
    const $choiceOutput = $('#cookie-choice-output');
    const $buzzer = $('#cookieButton');
    const $newButtons = $('.cookie-choice-buttons');
    const $winLoseText = $('.win-lose-post');
    let buzzerTimeout;

    const youLose = () => {
        const $loseAlert = $('<h2>', {
            text: 'YOU LOSE!!! TRY AGAIN!!!',
            css: {
                fontWeight: 'bold',
                fontSize: '40px'
            }
        });
        $winLoseText.append($loseAlert);
        $buzzer.off('click', youWin);
    };

    const youWin = () => {
        const $winAlert = $('<h2>', {
            text: 'WINNER!!!',
            css: {
                fontWeight: 'bold',
                fontSize: '26px'
            }
        });
        $winLoseText.append($winAlert);
        $paragraph.text('You won a cookie! What kind of cookie would you like?');
        clearTimeout(buzzerTimeout);
        $buzzer.off('click', youWin);

        const cookies = [
            'Chocolate Chip Cookie',
            'Oatmeal Raisin Cookie',
            'Sugar Cookie',
            'Snickerdoodle Cookie'
        ];

        cookies.forEach((cookie, index) => {
            const $button = $('<button>', {
                text: cookie,
                id: `cookieChoice${index + 1}`
            });
            $newButtons.append($button);
        });

        const cookieChoiceEventRemover = () => {
            $('.cookie-choice-buttons button').off('click', handleCookieChoiceClick);
        };

        const handleCookieChoiceClick = (event) => {
            const cookieText = $(event.target).text();
            const choiceMessage = $('<p>', {
                text: `You chose a ${cookieText}! Excellent Choice!`
            });
            $choiceOutput.append(choiceMessage);
            cookieChoiceEventRemover();
        };

        $('.cookie-choice-buttons button').on('click', handleCookieChoiceClick);
    };

    $buzzer.on('click', youWin);
    buzzerTimeout = setTimeout(youLose, 5000);
});
