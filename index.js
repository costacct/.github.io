

$(function() {
  let currentTag = ''
  let isFixedSort = false

  /* 被拖拽的元素 */
	$(".drag").on("dragstart", function(ev) {
		ev.originalEvent.dataTransfer.setData(
			"val",
			JSON.stringify({
				htmlString: $(this).html(),
        dataIndex: $(this).attr("data-index")
      })
    )
    currentTag = ev.target
	})

	$(".wrapper").on("dragover", function(ev) {
		ev.preventDefault()
		console.log("悬浮容器上方事件")
	})
	/* 拖动结束事件 */
	$(".drag").on("dragend", function(ev) {
		console.log("拖拽结束")
	})

	/* 拖拽容器 */
	$(".wrapper").on("drop", function(ev) {
    ev.preventDefault()
    let selfIndex = $(this).attr('data-index')
		console.log("执行放置事件 也就是数据的交互")
    let data = JSON.parse(ev.originalEvent.dataTransfer.getData("val"))
    let oli = ''
    if(data.dataIndex == selfIndex) {
      isFixedSort = true
      oli =  $(`<li>${data["htmlString"]}  
        <span class = "right"> TRUE </span>
      </li>`)
    } else{
     oli = $(`<li>${data["htmlString"]}  
     <span class = 'wrong'> FALSE </span>
     </li>`)
      isFixedSort = false
    }
    $(this).append($(oli))
    
    /* 删除掉原来的元素 */
    $(currentTag).remove()
   
    
	})
	$(".wrapper").on("dragenter", function(ev) {
		console.log(this)
		ev.preventDefault()
    console.log("拖动进入容器事件", "dragenter")
    
  })
  
  $('.btn').on('click',function(){
    if(isFixedSort) {
      alert('完成')
    }else{
      alert('失败')
    }
  })
})

