<?php
/**
 * Latestnews admin config
 *
 * @package LatestNews 
 * @subpackage adminstration
 */
class Latestnews_Admin {
	// Const varialbe nonce for forms
	const NONCE = 'latestnews-update-key';

	private static $initiated = false;
	private static $notices   = array();
	/**
	 * init function of the admin config
	 */
	public static function init() {
		if ( ! self::$initiated ) {
			self::init_hooks();
		}

		if ( isset( $_POST['action'] ) && $_POST['action'] == 'enter-key' ) {			
			self::enter_api_key();
		}
		
	}

	/**
	 * wp init hook method
	 */
	public static function init_hooks() {
		
		self::$initiated = true;

		//WP add action hooks to config menu and loading resources	
		add_action( 'admin_menu', array( 'Latestnews_Admin', 'admin_menu' ), 5 );
		add_action( 'admin_enqueue_scripts', array( 'Latestnews_Admin', 'load_resources' ) );

	}

	/**
	 * latest news adin hook menu
	 */
	public static function admin_menu() {		
		$hook = add_options_page( __('Config Daily News', 'latestnews'), __('Config Daily News', 'latestnews'), 'manage_options', 'latetnews-key-config', array( 'Latestnews_Admin', 'display_page' ) );
		if ( $hook ) {
			add_action( "load-$hook", array( 'Latestnews_Admin', 'admin_help' ) );
		}
	}


	/**
	 * Add help to the Latestnews page
	 *
	 * @return false if not the Latestnews page
	 */
	public static function admin_help() {
		$current_screen = get_current_screen();

		// Screen Content
		if ( current_user_can( 'manage_options' ) ) {
			if ( !LatestNews::get_api_key() || ( isset( $_GET['view'] ) && $_GET['view'] == 'start' ) ) {
				//setup page
				$current_screen->add_help_tab(
					array(
						'id'		=> 'overview',
						'title'		=> __( 'Overview' , 'latestNews'),
						'content'	=>
							'<p><strong>' . esc_html__( 'LatestNews Setup' , 'latestNews') . '</strong></p>' .
							'<p>' . esc_html__( 'LatestNews gies you daily dose of news around the corner.' , 'latestNews') . '</p>' .
							'<p>' . esc_html__( 'On this page, you are able to set up the LatestNews plugin.' , 'latestNews') . '</p>',
					)
				);

			}
		}
	}

	/**
	 * Latestnews admin configuration page
	 *
	 */
	public static function display_page() {
		if ( !LatestNews::get_api_key() || ( isset( $_GET['view'] ) && $_GET['view'] == 'start' ) )
			self::display_start_page();		
		else
			self::display_configuration_page();
	}

	/**
	 * Latestnews admin start and configuration page
	 */
	public static function display_start_page() {
		if ( isset( $_GET['action'] ) ) {
			if ( $_GET['action'] == 'delete-key' ) {
				if ( isset( $_GET['_wpnonce'] ) && wp_verify_nonce( $_GET['_wpnonce'], self::NONCE ) )
					delete_option( 'latestnews_api_key' );
			}
		}

		if ( $api_key = Latestnews::get_api_key() && ( empty( self::$notices['status'] ) || 'existing-key-invalid' != self::$notices['status'] ) ) {
			self::display_configuration_page();
			return;
		}
		
		if ( isset( $_GET['action'] ) ) {
			if ( $_GET['action'] == 'save-key' ) {
				self::display_configuration_page();
				return;
			}
		}
		$latestnews = Latestnews::get_latestnews_options();
		Latestnews::view( 'start', compact( 'latestnews' ) );
	}
	
	
	/**
	 * Latestnews Admin configuration page
	 */

	public static function display_configuration_page() {
		$api_key = Latestnews::get_api_key();
		
		$latestnews = Latestnews::get_latestnews_options();
							
		Latestnews::log( compact( 'stat_totals', 'latestnews' ) );
		Latestnews::view( 'config', compact( 'latestnews', 'notices' ) );
	}

	/**
	 * admin configuration page url
	 * @param string $page name
	 * @return string the admin config url
	 */
	public static function get_page_url( $page = 'config' ) {

		$args = array( 'page' => 'latetnews-key-config' );

		if ( $page == 'stats' )
			$args = array( 'page' => 'latetnews-key-config', 'view' => 'stats' );
		elseif ( $page == 'delete_key' )
			$args = array( 'page' => 'latetnews-key-config', 'view' => 'start', 'action' => 'delete-key', '_wpnonce' => wp_create_nonce( self::NONCE ) );

		$url = add_query_arg( $args, admin_url( 'options-general.php' ) );

		return $url;
	}
	/**
	 * config page is submitted from adminstration page
	 */
	public static function enter_api_key() {
				
		if ( !wp_verify_nonce( $_POST['_wpnonce'], self::NONCE ) ) {
			return false;
		}
		
		if ( LatestNews::predefined_api_key() ) {
			return false; 
		}
		
		$new_key  = preg_replace( '/[^a-z0-9]/i', '', $_POST['key'] );
		$new_host = preg_replace( '/[^a-z0-9.\-\/]/i', '', $_POST['host'] );
		$country = preg_replace( '/[^a-z]/i', '', $_POST['country'] );
		
		if ($new_key && $new_host) {
			$key_host = array('apiKey' => $new_key, 'host' => $new_host, 'country' => $country);
			self::save_key( $key_host );
		}		
	}

	/**
	 * Save|Update API key and Host name in DB 
	 */
	public static function save_key( $key_host) {		
		if ( get_option( 'latestnews_api_key' ) === false )  {							
			add_option( 'latestnews_api_key', $key_host, '', 'no' );			
		}
		else {
			update_option( 'latestnews_api_key',  $key_host );
		}
		
		self::$notices['status'] = 'new-key-valid';		
	}

	/**
	 * Load static resorces
	 */
	public static function load_resources() {
		wp_register_style( 'newsstyles.css', plugin_dir_url( __FILE__ ) . 'css/newsstyles.css', array(), LATESTNEWS_VERSION );
		wp_enqueue_style( 'newsstyles.css');
	}

}