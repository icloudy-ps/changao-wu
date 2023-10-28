import { ElMessageBox, ElMessage } from 'element-plus'
export const quitORconfirm = (handleConfirm, handleCancel) => {
    ElMessageBox.confirm(
        '删除操作不可逆, 确定删除吗 ?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => { // 点击了确定按钮
            handleConfirm && handleConfirm()
        })
        .catch(() => { // 点击了退出/取消按钮
            ElMessage.info("取消了删除操作");
            handleCancel && handleCancel()
        })
}