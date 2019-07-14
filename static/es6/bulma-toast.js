$(() => {
    $('#notification-holder').on('click', '.notification .delete', function (e) {
        // e.target.parentNode.remove();
        let parent = $(e.target.parentNode);
        remove_notification(parent)
    })
});

function remove_notification(target) {
    const newcss = {"visibility": "hidden", display: 'block'};

    if(!target.hasClass('is-removed')) {

        target.children().css(newcss);

        target.css(newcss).slideUp().addClass('is-removed');
    }
    }


function notify(text, state = 'success', delay = 2000) {
    let instance = $(`<div class="notification is-${state}">`);
    instance.loadTemplate('#notification-template', {content: text});
    $('#notification-holder').append(instance);

    setTimeout(()=>remove_notification(instance), delay)
}