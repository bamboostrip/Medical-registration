//上传图片
function uploadImage(url:string,uptit: string,errtit: string) {
  return new Promise((resolve,reject) => { 
    uni.chooseMedia({
      count:1,
      mediaType:['image'],
      sizeType:['compressed'],
      success: (res:any) => { 
        uni.showLoading({
          title:uptit,
          mask:true
        })
        uni.uploadFile({
          url,
          filePath: res.tempFiles[0].tempFilePath,
          name:'file',
          header:{accept:'application/json'},
          success: (resImg: any) => { 
            resolve(resImg)
            uni.hideLoading()
           },
           fail: (errImg: any) => { 
            reject(errImg)
            uni.showToast({
              title:errtit,
              icon:'error'
            })
            } 
        })
       }
    })
   })
} 
export {
  uploadImage
}