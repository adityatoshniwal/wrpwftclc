# -*- mode: python -*-

block_cipher = None

uiFilesDist = Tree('./ui/dist','ui/dist')
uiFiles = Tree('./ui','ui',excludes=["*.json","*.js","*.lock","node_modules","modules"])

a = Analysis(['flaskdesk.py'],
             pathex=['/Users/adityatoshniwal/projects/warpweft_backend'],
             binaries=[],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
	  uiFilesDist,
	  uiFiles,
          a.zipfiles,
          a.datas,
          name='WarpWeftCalc',
          debug=False,
          strip=False,
          upx=True,
          runtime_tmpdir=None,
          console=True )
