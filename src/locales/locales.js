import { defineMessages } from 'react-intl';

// Top Menu messages
defineMessages({
  companyLogoLabel: {
    id: 'menu_wrapper.company_logo',
    defaultMessage: 'Logo da empresa',
  },
  dashboardLabel: { id: 'top_menu.adherence', defaultMessage: 'adherence' },
  dashboardHomeLabel: { id: 'top_menu.home', defaultMessage: 'home' },
  qualityLabel: { id: 'top_menu.quality', defaultMessage: 'qualidade' },
  reportsLabel: { id: 'top_menu.reports', defaultMessage: 'relatórios' },
  feedbackLabel: { id: 'top_menu.feedback', defaultMessage: 'feedback' },
  actionPlanLabel: {
    id: 'top_menu.action_plan',
    defaultMessage: 'plano de ação',
  },
  remindersLabel: { id: 'top_menu.reminders', defaultMessage: 'compromissos' },
});

// Reports Screen messages
defineMessages({
  searchLabel: {
    id: 'reports.search_label',
    defaultMessage: 'Buscar pelo nome do compromisso',
  },
  statusLabel: { id: 'reports.status_label', defaultMessage: 'Status' },
  filterLabel: { id: 'reports.filter_label', defaultMessage: 'Filtrar busca' },
  exportLabel: { id: 'reports.export_label', defaultMessage: 'Exportar dados' },
  doneReportLabel: { id: 'reports.done_label', defaultMessage: 'Concluído' },
  pendingReportLabel: {
    id: 'reports.pending_label',
    defaultMessage: 'Previsto',
  },
  delayedReportLabel: {
    id: 'reports.delayed_label',
    defaultMessage: 'Atrasado',
  },
  canceledReportLabel: {
    id: 'reports.canceled_label',
    defaultMessage: 'Cancelado',
  },
  doneDelayedReportLabel: {
    id: 'reports.done_delayed_label',
    defaultMessage: 'Concluído com atraso',
  },
  isActiveLabel: { id: 'reports.is_active_label', defaultMessage: 'Ativo?' },
  reportNameLabel: {
    id: 'reports.name_label',
    defaultMessage: 'ID - Nome do compromisso',
  },
  formNameLabel: {
    id: 'reports.form_label',
    defaultMessage: 'Nome do formulário',
  },
  evaluatorsLabel: {
    id: 'reports.evaluators_label',
    defaultMessage: 'Avaliadores',
  },
  evaluatedLabel: {
    id: 'reports.evaluated_label',
    defaultMessage: 'Avaliados',
  },
  periodLabel: { id: 'reports.period_label', defaultMessage: 'Período' },
  activeLabel: { id: 'reports.active_label', defaultMessage: 'Ativo' },
  inactiveLabel: { id: 'reports.inactive_label', defaultMessage: 'Inativo' },
  rescheduledLabel: {
    id: 'reports.rescheduled_label',
    defaultMessage: 'Compromisso reagendado',
  },
  to: { id: 'reports.to', defaultMessage: 'às' },
});

// ReportSideFilter messages
defineMessages({
  reminderTypeTitleLabel: {
    id: 'report_side_filter.reminder_type_title',
    defaultMessage: 'Tipo de compromisso',
  },
  formTitleLabel: {
    id: 'report_side_filter.form_title',
    defaultMessage: 'Formulário',
  },
  formTypeTitleLabel: {
    id: 'report_side_filter.form_type_title',
    defaultMessage: 'Tipo de formulário',
  },
  dateRangeTitleLabel: {
    id: 'report_side_filter.date_title',
    defaultMessage: 'Início e fim do compromisso',
  },
  statusTitleLabel: {
    id: 'report_side_filter.status_title',
    defaultMessage: 'Status do compromisso',
  },
  groupTitleLabel: {
    id: 'report_side_filter.group_title',
    defaultMessage: 'Grupo',
  },
  appUserTitleLabel: {
    id: 'report_side_filter.app_user_title',
    defaultMessage: 'Avaliador',
  },
  evaluatedTitleLabel: {
    id: 'report_side_filter.evaluated_title',
    defaultMessage: 'Avaliado',
  },

  formPlaceholderLabel: {
    id: 'report_side_filter.form_placeholder',
    defaultMessage: 'Selecione um formulário',
  },
  formTypePlaceholderLabel: {
    id: 'report_side_filter.form_type_placeholder',
    defaultMessage: 'Selecione um tipo de formulário',
  },
  statusPlaceholderLabel: {
    id: 'report_side_filter.status_placeholder',
    defaultMessage: 'Selecione um status do compromisso',
  },
  groupPlaceholderLabel: {
    id: 'report_side_filter.group_placeholder',
    defaultMessage: 'Selecione um grupo',
  },
  appUserPlaceholderLabel: {
    id: 'report_side_filter.app_user_placeholder',
    defaultMessage: 'Selecione um avaliador',
  },
  evaluatedPlaceholderLabel: {
    id: 'report_side_filter.evaluated_placeholder',
    defaultMessage: 'Selecione um avaliado',
  },

  filterLabel: { id: 'report_side_filter.filter', defaultMessage: 'Filtrar' },
  clearFiltersLabel: {
    id: 'report_side_filter.clear_filters',
    defaultMessage: 'Limpar filtros',
  },
  filterButtonLabel: {
    id: 'report_side_filter.filter_button',
    defaultMessage: 'Filtrar',
  },

  titleLabel: { id: 'export_report.title', defaultMessage: 'Exportar Dados' },
  reportLabel: {
    id: 'export_report.report_label',
    defaultMessage: 'Relatórios:',
  },
  reportPlaceholder: {
    id: 'export_report.report_placeholder',
    defaultMessage: 'Selecione qual relatório você deseja exportar',
  },
  dateLabel: {
    id: 'export_report.date_label',
    defaultMessage: 'Defina o período da exportação:',
  },
  cancelButtonLabel: {
    id: 'export_report.cancel_button_label',
    defaultMessage: 'Cancelar',
  },
  exportButtonLabel: {
    id: 'export_report.export_button_label',
    defaultMessage: 'Exportar XLS',
  },

  noFilterParamsWarning: {
    id: 'export_report.no_params_warning',
    defaultMessage: 'Selecione uma opção de filtro para apresentar resultados.',
  },
  filtersWarning: {
    id: 'export_report.filters_warning',
    defaultMessage:
      'Existem opções selecionadas no filtro de relatórios que podem influenciar os dados dessa exportação.',
  },
  maxPeriodRangeWarning: {
    id: 'export_report.max_period_message',
    defaultMessage:
      'O intervalo de tempo máximo para exportação dos dados é de 1 ano.',
  },
});

// DatePicker messages
defineMessages({
  datePlaceholderLabel: {
    id: 'date_picker.date_placeholder',
    defaultMessage: 'dd/mm/aa',
  },
});

// DateFilter messages
defineMessages({
  startDateLabel: {
    id: 'date_filter.start_date',
    defaultMessage: 'Data inicial',
  },
  endDateLabel: { id: 'date_filter.end_date', defaultMessage: 'Data final' },
});

// SelectInput messages
defineMessages({
  noOptionsLabel: {
    id: 'select_input.no_options',
    defaultMessage: 'Nenhum resultado encontrado',
  },
});

// Home dashboard messages
defineMessages({
  titleLabel: { id: 'home_dashboard.title', defaultMessage: 'Dashboard' },
});

// Reminder types
defineMessages({
  pendingLabel: {
    id: 'reminder_types.action_plan',
    defaultMessage: 'Plano de Ação',
  },
  lateLabel: { id: 'reminder_types.feedback', defaultMessage: 'Feedback' },
  otherLabel: { id: 'reminder_types.other', defaultMessage: 'Outros' },
});

// Reminder statuses
defineMessages({
  pendingLabel: {
    id: 'reminder_statuses.pending',
    defaultMessage: 'Previsto',
  },
  lateLabel: { id: 'reminder_statuses.late', defaultMessage: 'Atrasado' },
  accomplishedLabel: {
    id: 'reminder_statuses.accomplished',
    defaultMessage: 'Concluído',
  },
  cancelledLabel: {
    id: 'reminder_statuses.cancelled',
    defaultMessage: 'Cancelado',
  },
  rescheduledLabel: {
    id: 'reminder_statuses.rescheduled',
    defaultMessage: 'Reagendado',
  },
});

// Report export modal messages
defineMessages({
  weeklyLabel: { id: 'weekly_period', defaultMessage: 'Semanal' },
  biweeklyLabel: { id: 'biweekly_period', defaultMessage: 'Quinzenal' },
  monthlyLabel: { id: 'monthly_period', defaultMessage: 'Mensal' },
  schedulesReportLabel: {
    id: 'rel_report_schedules',
    defaultMessage: 'Agenda',
  },
  answersReportLabel: { id: 'rel_answers', defaultMessage: 'Respostas' },
  imagesReportLabel: { id: 'rel_images', defaultMessage: 'Imagens' },
  actionPlanReportLabel: {
    id: 'rel_action_plans',
    defaultMessage: 'Planos de Ações',
  },
  feedbacksReportLabel: { id: 'rel_feedbacks', defaultMessage: 'Feedback' },
  rescheduledsReportLabel: {
    id: 'rel_rescheduleds',
    defaultMessage: 'Reagendamentos',
  },
  canceledReportLabel: { id: 'rel_canceled', defaultMessage: 'Cancelamentos' },
  exportSuccess: {
    id: 'rel_export_success',
    defaultMessage:
      'Pedido de exportação concluído! Aguarde o email com o link para download.',
  },
  exportFailure: {
    id: 'rel_export_failure',
    defaultMessage: 'Algo de errado aconteceu durante o pedido de exportação.',
  },
  topMenuLabel: { id: 'rel_export_report', defaultMessage: 'Exportar dados' },
  tooltipEmail: {
    id: 'rel_export.tooltip',
    defaultMessage:
      'Este campo é opcional. Caso não seja informado para qual e-mail o relatório será enviado, este será entregue para o e-mail utilizado para acessar o sistema.',
  },
  emailPlaceholder: {
    id: 'rel_export.email_placeholder',
    defaultMessage: 'Informe para qual e-mail o relatório será enviado',
  },
  emailErrorMessage: {
    id: 'rel_export.email_error_message',
    defaultMessage: 'O e-mail informado é inválido.',
  },
});

// Warning Label messages
defineMessages({
  warningLabel: { id: 'warning_label.warning', defaultMessage: 'Atenção!' },
});
