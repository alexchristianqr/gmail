#!/usr/bin/env bash
# AutoTag application.
#
# MIT License
#
# Copyright (c) 2020 - 2022 MichaelCurrin
#
# https://github.com/MichaelCurrin/auto-tag/blob/master/LICENSE

set -e

FALLBACK_TAG='v0.0.0'
USAGE='MODO DE USO:
    sh ghpages.sh b -p # Incrementar versión a level BUG con vista previa - LOCAL
    sh ghpages.sh b -dp # Incrementar versión a level BUG, pero antes elimina el ultimo tag con vista previa - LOCAL
    sh ghpages.sh b # Incrementar versión a level BUG - REMOTO
    sh ghpages.sh b -d # Incrementar versión a level BUG, pero antes elimina el ultimo tag para agregar nuevos cambios al antiguo tag - REMOTO
'
HELP="DOCUMENTACION:
    Posición de los argumentos:
        [0] sh ghpages        : Posición 0 en el argumento de la ejecución del shell script
        [1] b|m|M             : Posición 1 en el argumento de la ejecución del shell script
        [2] -p|-d|-dp         : Posición 2 en el argumento de la ejecución del shell script

    Acciones de los argumentos:
        b                       : Incrementar versión a level BUG.
        m                       : Incrementar versión a level MENOR.
        M                       : Incrementar versión a level MAYOR.
        -p, --preview           : Realiza un ensayo para mostrar solo la nueva etiqueta, sin crearla.
                                  Esto debe usarse como el segundo argumento después del NIVEL.
        -d, --deleted           : Elimina el ultimo tag registrado.
        -dp, --deleted-preview  : Elimina el ultimo tag registrado.

    Ayuda:
        -h, --help    : Mostrar ayuda y salir.
"
AUTHOR="AUTORIA PRINCIPAL
    Repositorio:
        Link          : https://raw.githubusercontent.com/MichaelCurrin/auto-tag/master/autotag
"
USER_ARGS="$*"
DOWNLOAD_URL='https://raw.githubusercontent.com/MichaelCurrin/auto-tag/master/autotag'

# Dynamic variables. Unfortunately all are global but at least there are
# functions now so the script is easier to work with. Also they don't have to be
# set here even, but are set for clarity.
LEVEL_CHOICE=''
MAJOR=''
MINOR=''
BUG=''
LAST_MAJOR=''
LAST_MINOR=''
LAST_BUG=''
LAST_TAG=''
NEW_TAG=''

PREVIEW='false'
DELETED='false'
DELETED_PREVIEW='false'
LAST_TAG_TO_DELETED=''

# Imprimir ayuda si se usaron los argumentos apropiados.
help_if_needed() {
  if [[ "$#" -eq 0 ]] || [[ "$1" == '-h' ]] || [[ "$1" == '-H' ]] || [[ "$1" == '--help' ]]; then
    echo "$USAGE"
    echo "$HELP"
    echo "$AUTHOR"
    exit 1
  fi
}

# Mostrar los errores por los argumentos inválidos.
invalid_args_error() {
  echo "Invalid arguments: '$USER_ARGS'"
  echo
  echo " $USAGE"
  exit 1
}

# Procesar los argumentos enviado desde la CLI.
process_args() {
  LEVEL_CHOICE="$1"

  if [[ "$2" ]]; then

    if [[ "$2" == '-p' ]] || [[ "$2" == '-P' ]] || [[ "$2" == '--preview' ]]; then
      PREVIEW='true'

    elif [[ "$2" == '-d' ]] || [[ "$2" == '-D' ]] || [[ "$2" == '--deleted' ]]; then
      DELETED='true'

    elif [[ "$2" == '-dp' ]] || [[ "$2" == '-Dp' ]] || [[ "$2" == '-DP' ]] || [[ "$2" == '--deleted-preview' ]]; then
      DELETED_PREVIEW='true'

    else
      invalid_args_error
    fi

  else
    PREVIEW='false'
    DELETED='false'
    DELETED_PREVIEW='false'
  fi
}

# Obtener la lista de tags desde el repositorio remoto.
fetch_tags() {
  git fetch --tags
}

# Encontrar el ultimo tag creado en el repositorio actual.
get_last_tag() {
  LAST_TAG=$(git describe --abbrev=0 --tags 2>/dev/null || true)
  LAST_TAG="${LAST_TAG:-$FALLBACK_TAG}"
  LAST_TAG="${LAST_TAG/v/}"

  # Replace dot with space then split into array.
  LAST_TAG_ARR=(${LAST_TAG//./ })

  MAJOR="${LAST_TAG_ARR[0]}"
  MINOR="${LAST_TAG_ARR[1]}"
  BUG="${LAST_TAG_ARR[2]}"
}

# Determinar el nuevo número de tag
set_level() {
  LAST_MAJOR="$MAJOR"
  LAST_MINOR="$MINOR"
  LAST_BUG="$BUG"

  # Although the exit only happens after fetching, this needs to happen here so
  # variables are set.
  # Otherwise a refactor is needed to check M|m|b and exit if needed, then
  # actually calculate here.
  case "$LEVEL_CHOICE" in
  "M")
    ((LAST_MAJOR += 1))
    LAST_MINOR=0
    LAST_BUG=0
    ;;
  "m")
    ((LAST_MINOR += 1))
    LAST_BUG=0
    ;;
  "b")
    ((LAST_BUG += 1))
    ;;
  *)
    invalid_args_error
    ;;
  esac

  NEW_TAG="v$LAST_MAJOR.$LAST_MINOR.$LAST_BUG"
}

# Crear nuevo tag
create_tag() {
  git tag -a "$NEW_TAG" \
    -m "$NEW_TAG"
}

# Eliminar último tag
delete_tag() {
  LAST_TAG_TO_DELETED=$(git describe --abbrev=0 --tags 2>/dev/null || true)

  if [[ "$DELETED" == true ]]; then
    git tag -d "$LAST_TAG_TO_DELETED"
    git push --delete origin "$NEW_TAG"
  fi
}

# Desplegar último versionamiento de tag con Githug Pages
deploy_to_ghpages() {
  set -e

  git push origin "$NEW_TAG"

  npm run build

  cd www

  git init
  git add -A
  git commit -m "New deployment for release $NEW_TAG"
  git push -f git@github.com:alexchristianqr/gmail.git main:gh-pages

  cd -
}

# Imprimir texto de versionamiento
print_init() {
  if [[ "$PREVIEW" == true ]] || [[ "$DELETED_PREVIEW" == true ]]; then
    echo "[PREVIEW] :: En este modo puedes visualizar lo que pasará."
  else
    echo "[EXECUTED]  :: En este modo puedes visualizar lo que pasó."
  fi

  if [[ "$DELETED_PREVIEW" == true ]]; then
    echo "✔  Deleted tag: $LAST_TAG_TO_DELETED"
    echo "✔  Next new tag: v$MAJOR.$MINOR.$BUG"
  else
    if [[ "$DELETED" == true ]]; then
      echo "✔  Deleted tag: $LAST_TAG_TO_DELETED"
    fi
    echo "✔  Last tag: v$MAJOR.$MINOR.$BUG"
    echo "✔  New tag: $NEW_TAG"
  fi

  if [[ "$PREVIEW" == true ]] || [[ "$DELETED_PREVIEW" == true ]]; then
    echo "[END_PREVIEW]"
  else
    echo "[END_EXECUTED]"
  fi
}

# Validar la acción de los argumentos
validate_args_action() {
  if [[ "$PREVIEW" == true ]]; then
    # Obtener el último tag
    get_last_tag

    # Obtener la nueva versión del tag
    set_level

    # Imprimir texto de versionamiento
    print_init

  elif [[ "$DELETED_PREVIEW" == true ]]; then

    # Obtener el ultimo tag
    get_last_tag

    # Eliminar último tag registrado
    delete_tag

    # Obtener el ultimo tag
    get_last_tag

    # Obtener la nueva versión del tag
    set_level

    # Imprimir texto de versionamiento
    print_init

  elif [[ "$DELETED" == true ]]; then

    # Obtener el ultimo tag
    get_last_tag

    # Eliminar tag
    delete_tag

    # Obtener el ultimo tag
    get_last_tag

    # Obtener la nueva versión del tag
    set_level

    # Crear tag
    create_tag

    # Desplegar en Github Pages
    deploy_to_ghpages

    # Imprimir texto de versionamiento
    print_init

  else

    # Obtener el ultimo tag
    get_last_tag

    # Obtener la nueva versión del tag
    set_level

    # Crear tag
    create_tag

    # Desplegar en Github Pages
    deploy_to_ghpages

    # Imprimir texto de versionamiento
    print_init
  fi
}

# Ejecutar funciones
run() {
  # Validar la acción del argumento
  validate_args_action
}

# Ejecutar funciones
main() {
  help_if_needed "$@" # Ayuda
  process_args "$@"   # Procesar argumentos
  run                 # Ejecutar funciones
}

# Iniciar programa shell script
main "$@"
