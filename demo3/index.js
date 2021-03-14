
$(function() {
  let currentTag = ""
  let isFixedSort = false

  $(".box").on("dragstart", 'li',function (ev) {
    ev.originalEvent.dataTransfer.setData(
      'value', JSON.stringify({
        htmlString: $(this).text(),
        index: $(this).data().index
      })
    )
    currentTag = ev.currentTarget

  })


  $(".wrap").on("dragover", function(ev) {
    // console.log(ev, "dragover")
    ev.preventDefault() // clear default events
  })
  /* drag event ends */
  $(".drag").on("dragend", function(ev) {

    ev.preventDefault()
  })

  /* container = income statement table */
  $(".wrap").on("drop", function(ev) {
    console.log($('.wrap'))
    let idx = $(this).data().index
    console.log(ev.originalEvent.dataTransfer.getData("value"))
    let data = JSON.parse(ev.originalEvent.dataTransfer.getData("value"))


    if (idx === data.index) {
      oli = `<li class="drag" data-index="${data.index}"  style="color: greenyellow">${data.htmlString}</li>`

    } else {
      oli = `<li class="drag wrap" data-index="${data.index}" draggable="true" style="color: red">${data.htmlString}</li>`
    }

    $(this).replaceWith($(oli))
    $(currentTag).html('')

      ev.preventDefault()

  })
  $(".drag").on("dragend", function(ev) {
    console.log(currentTag, 456)
    $(currentTag).html('')
    ev.preventDefault()
  })

})
