# actions/reducer/sagas/selectors

## actions.ts по-человечески, как думает разработчик

1. Сначала разработчик определяет "события системы"
   У тебя 2 независимых запроса:

   Загрузка списка
   Загрузка деталей
   Для каждого асинхронного запроса стандартный жизненный цикл:

   Requested (начали запрос)
   Succeeded (успешно получили данные)
   Failed (получили ошибку)
   Итого нужно 6 action-ов.

2. Почему именно action-ы, а не сразу fetch в компоненте
   Потому что в Redux-Saga компоненты "тупые":

   компонент только диспатчит событие (listRequested)
   saga ловит событие и делает call к API
   reducer меняет loading/error/data
   UI просто отображает state
   Это разделение ответственности и есть взрослая архитектура.

3. Как выбрать payload для каждого action
   Логика такая:

   listRequested — payload не нужен (просто "запусти загрузку списка").
   listSucceeded — payload массив ServiceListItem[].
   listFailed — payload текст ошибки string.
   detailsRequested — нужен id: number, чтобы понять какую услугу грузить.
   detailsSucceeded — payload ServiceDetails.
   detailsFailed — payload string.
