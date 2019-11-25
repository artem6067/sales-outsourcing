const $ = require('jquery');

function getPagesList() {
  $('h2').remove()

  $.get('./api', data => {
    data.forEach( file => {
      $('body').append('<h2>' + file + '</h2>')
    })
  }, 'JSON')
}
getPagesList()

$('.button-add-page').click(() => {
  $.post(
    './api/createNewHtmlPage.php',
    {
      'name': $('.input-add-page').val()
    },
    data => {
      getPagesList()
    }
  )
  .fail(() => {
    alert('Такая страница уже существует')
  })
})

$('.button-delete-page').click(() => {
  $.post(
    './api/deleteHtmlPage.php',
    {
      'name': $('.input-delete-page').val()
    },
    data => {
      getPagesList()
    }
  )
  .fail(() => {
    alert('Такая страница не существует')
  })
})
