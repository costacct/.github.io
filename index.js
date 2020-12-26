$(function() {
	let currentTag = ""
	let isFixedSort = false

	/* 被拖拽的元素 */
	$(".drag").on("dragstart",function (ev) {
    $(this).children().remove()
		ev.originalEvent.dataTransfer.setData(
			"val",
			JSON.stringify({
				htmlString: $(ev.target).html(),
				dataIndex: $(ev.target).attr("data-index")
			})
		)
		currentTag = ev.target
	})

	$(".wrapper").on("dragover", function(ev) {
		ev.preventDefault()
	})
	/* 拖动结束事件 */
	$(".drag").on("dragend", function(ev) {
		ev.preventDefault()
	})

	/* 拖拽容器 */
	$(".wrapper").on("drop", function(ev) {
		ev.preventDefault()
		let selfIndex = $(this).attr("data-index")
		let data = JSON.parse(ev.originalEvent.dataTransfer.getData("val"))
		let oli = ""

    data.dataIndex == selfIndex ? isFixedSort = true : isFixedSort = false

  	oli = $(`<p class="drag" draggable= ${!isFixedSort ? 'true' : 'false'} data-index = ${data.dataIndex}>${data["htmlString"]}  
     <span class = ${isFixedSort ? 'right' : 'wrong'}>  ${isFixedSort ? 'TRUE' : 'FALSE'} </span>
     </p>`)
		$(oli).on("dragstart", function(ev)  {
      $(this).children().remove()
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
	$(".wrapper").on("dragenter", function(ev) {
		ev.preventDefault()
		// console.log("拖动进入容器事件", "dragenter")
	})
})
