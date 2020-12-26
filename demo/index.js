$(function() {
  let currentTag = ""
  let isFixedSort = false

  /* elements to be dragged into income statement*/
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
    ev.preventDefault() // 清除默认事件
  })
  /* drag event ends */
  $(".drag").on("dragend", function(ev) {
    ev.preventDefault()
  })

  /* container */
  $(".container").on("drop", function(ev) {
    ev.preventDefault()
    let selfIndex = $(this).attr("data-index")
    let data = JSON.parse(ev.originalEvent.dataTransfer.getData("val"))  // 序列化解析
    let oli = ""

    data.dataIndex == selfIndex ? isFixedSort = true : isFixedSort = false
    oli = $(`<li class="drag + ${data.isBold?'bold' : ''}"  draggable= ${!isFixedSort ? 'true' : 'false'} data-index = ${data.dataIndex}>
      ${data["htmlString"]}
     <span class = ${isFixedSort ? 'true' : 'wrong'}>  ${isFixedSort ? 'TRUE' : 'FALSE'} </span>
     </li>`)
    //  动态追加的元素 追加的事件 需要采用事件委托 或者 重新 执行事件
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
    // 放到格子里
    $(this).append($(oli))

    /* delete original elements */
    $(currentTag).remove()
    $(currentTag).children().remove()
  })

})
