$(function() {
  let currentTag = ""
  let isFixedSort = false

  /* elements to be dragged into income statement*/
  $(".drag").on("dragstart",function (ev) {
    //console.log(ev.target, 'target')
    let isBold = $(ev.target).hasClass('bold')
    $(this).children().remove()
    ev.originalEvent.dataTransfer.setData(
      "val",
      JSON.stringify({
        htmlString: $(ev.target).html(),
        dataIndex: $(ev.target).attr("data-index"),
        isBold:isBold
      })
    )
    currentTag = ev.target
  })

  $(".container").on("dragover", function(ev) {
    ev.preventDefault()
  })
  /* drag event ends */
  $(".drag").on("dragend", function(ev) {
    ev.preventDefault()
  })

  /* container */
  $(".container").on("drop", function(ev) {
    ev.preventDefault()
    let selfIndex = $(this).attr("data-index")
    console.log(ev.originalEvent.dataTransfer.getData("val"), "test")
    let data = JSON.parse(ev.originalEvent.dataTransfer.getData("val"))
    let oli = ""

    data.dataIndex == selfIndex ? isFixedSort = true : isFixedSort = false
    oli = $(`<li class="drag + ${data.isBold?'bold' : ''}"  draggable= ${!isFixedSort ? 'true' : 'false'} data-index = ${data.dataIndex}>
      ${data["htmlString"]}
     <span class = ${isFixedSort ? 'true' : 'wrong'}>  ${isFixedSort ? 'TRUE' : 'FALSE'} </span>
     </li>`)
    $(oli).on("dragstart", function(ev)  {
      $(this).children('span').remove()
      ev.originalEvent.dataTransfer.setData(
        "val",
        JSON.stringify({
          htmlString: $(ev.target).html(),
          dataIndex: $(ev.target).attr("data-index")
        })
      )
      currentTag = ev.target
      console.log(currentTag, '12');
    })
    $(this).append($(oli))

    /* delete original elements */
    $(currentTag).remove()
    $(currentTag).children().remove()
  })
  $(".container").on("dragenter", function(ev) {
    ev.preventDefault()
    return false

  })
})
