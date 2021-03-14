$(function() {
  let currentTag = ""
  let isFixedSort = false

  /* create elements to be dragged into income statement table*/
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

  $(".wrap").on("dragover", function(ev) {
    ev.preventDefault() // clear default events
  })
  /* drag event ends */
  $(".drag").on("dragend", function(ev) {
    ev.preventDefault()
  })

  /* container = income statement table */
  $(".wrap").on("drop", function(ev) {
    ev.preventDefault()
    let selfIndex = $(this).attr("data-index")
    let data = JSON.parse(ev.originalEvent.dataTransfer.getData("val"))
    let oli = ""

    data.dataIndex == selfIndex ? isFixedSort = true : isFixedSort = false
    oli = $(`<span class="drag" style="color: ${isFixedSort ? '#008A00' : 'red'}"  draggable= ${!isFixedSort ? 'true' : 'false'} data-index = ${data.dataIndex}>
      ${data["htmlString"]}
     </span>`) // add into income statement
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
    // put into income statement table
    $(this).append($(oli))

    /* delete original elements */
    $(currentTag).remove()
    $(currentTag).children().remove()
  })

})
