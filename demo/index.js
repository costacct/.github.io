$(function() {
  let currentTag = ""
  let isFixedSort = false

  /* 被拖拽的元素 */
  $(".drag").on("dragstart",function (ev) {
    console.log(ev.target, 'target')
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
  /* 拖动结束事件 */
  $(".drag").on("dragend", function(ev) {
    ev.preventDefault()
  })

  /* 拖拽容器 */
  $(".container").on("drop", function(ev) {
    ev.preventDefault()
    let selfIndex = $(this).attr("data-index")
    console.log(ev.originalEvent.dataTransfer.getData("val"), "测试")
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

    /* 删除掉原来的元素 */
    $(currentTag).remove()
    $(currentTag).children().remove()
  })
  $(".container").on("dragenter", function(ev) {
    ev.preventDefault()
    return false

  })
})
