import os

import scriptutils


def cp_file_check_folder(f, dst_folder, dst_filename):
    """
    复制文件并检查目标文件夹是否存在
    @param f 源路径
    @param dst_folder 目标文件夹
    @param dst_filename 目标文件
    """
    if os.path.exists(dst_folder):
        scriptutils.cp_file(f, os.path.join(dst_folder, dst_filename))
        print("copying " + f + " to " + dst_folder + ".")
    else:
        print("dst folder not found.ignore.")


if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

    os.system("node esbuild.mjs --production")

    cp_file_check_folder("./dist/syPicgo.js", "/Users/terwer/Documents/mydocs/siyuan-plugins/siyuan-plugin-picgo/public/libs/sy-picgo-core", "syPicgo.js")
    print("build finished.")
