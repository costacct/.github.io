$(function() {
  let currentTag = ""
  let isFixedSort = false

  /* create elements to be dragged into the table*/
  $(".drag").on("dragstart",function (ev) {
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
    ev.preventDefault() // clear default events
  })
  /* drag event ends */
  $(".drag").on("dragend", function(ev) {
    ev.preventDefault()
  })

  /* container = table */
  $(".container").on("drop", function(ev) {
    ev.preventDefault()
    let selfIndex = $(this).attr("data-index")
    let data = JSON.parse(ev.originalEvent.dataTransfer.getData("val"))  
    let oli = ""

    data.dataIndex == selfIndex ? isFixedSort = true : isFixedSort = false
    oli = $(`<li class="drag + ${data.isBold?'bold' : ''}"  draggable= ${!isFixedSort ? 'true' : 'false'} data-index = ${data.dataIndex}>
      ${data["htmlString"]}
     <span class = ${isFixedSort ? 'true' : 'wrong'}>  ${isFixedSort ? 'TRUE' : 'FALSE'} </span>
     </li>`) // add into table
    $(oli).on("dragstart", function(ev)  {
      let isBold = $(ev.target).hasClass('bold')
      $(this).children('span').remove()
      ev.originalEvent.dataTransfer.setData(
        "val",
        JSON.stringify({
          htmlString: $(ev.target).html(),
          isBold:isBold,
          dataIndex: $(ev.target).attr("data-index")
        })
      )
      currentTag = ev.target
    })
    // put into table
    $(this).append($(oli))

    /* delete original elements */
    $(currentTag).remove()
    $(currentTag).children().remove()
  })

})
