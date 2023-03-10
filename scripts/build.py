import argparse
import os

import scriptutils

if __name__ == "__main__":
    # 切换工作空间
    scriptutils.switch_workdir()

    # 参数解析
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--common", action="store_true", required=False, help="build common")
    parser.add_argument("-t", "--theme", action="store_true", required=False, help="build theme")
    parser.add_argument("-b", "--blog", action="store_true", required=False, help="build blog")
    parser.add_argument("-v", "--verbose", action="store_true", help="enable verbose output")
    args = parser.parse_args()

    if args.verbose:
        print("Verbose mode enabled")

    if args.common:
        # common
        os.chdir("./apps/common")
        os.system("pnpm package")
        print("Common build finished.")
    if args.blog:
        # blog
        os.chdir("./apps/blog")
        os.system("pnpm generate")
        print("Blog build finished.")
    elif args.theme:
        # theme
        os.chdir("./apps/theme")
        os.system("pnpm build")
        print("Theme build finished.")
    else:
        os.chdir("./apps/common")
        os.system("pnpm package")
        os.chdir("../theme")
        os.system("pnpm build")
        os.chdir("../blog")
        os.system("pnpm build")

        print("Theme and blog are build finished.")