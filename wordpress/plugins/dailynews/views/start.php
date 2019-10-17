<div id="latestnews-plugin-container">	
	<div class="latestnews-lower">	
		<div class="latestnews-box">
			<h2><?php esc_html_e( 'Daily up to date news for you', 'latestnews' ); ?></h2>
			<p><?php esc_html_e( 'add the google news API KEY and HOST Name.', 'latestnews' ); ?></p>
		</div>
		<div class="latestnews-boxes">
			<?php if ( ! LatestNews::predefined_api_key() ) { ?>				
				<div class="latestnews-box">
					<h3><?php esc_html_e( 'Enter API key and host', 'latestnews' ); ?></h3>
					<form action="<?php echo esc_url( LatestNews_Admin::get_page_url() ); ?>" method="post">
						<?php wp_nonce_field( LatestNews_Admin::NONCE ) ?>
						<input type="hidden" name="action" value="enter-key">
						<div class="latestnews-form">
							<label for='host'>
								<span><b>Host Name:</b> https://</span>
								<input placeholder="newsapi.org/v2/top-headlines/" id="host" name="host" type="text" size="15" value="<?php echo ($latestnews->host) ?>" class="regular-text code">
							</label>
							<label for='key'>
								<span><b>Key:</b></span>
								<input id="key" name="key" type="text" size="15" value="<?php echo ($latestnews->apiKey) ?>" class="regular-text code">
							</label>
							<label for='country'>
								<span><b>Country Code:(IN|US|UK etc.)</b></span>
								<input placeholder="IN or US" id="country" name="country" type="text" size="15" value="<?php echo ($latestnews->country) ?>" class="regular-text code">
							</label>
							<input type="submit" name="submit" id="submit" value="<?php esc_attr_e( 'Save', 'latestnews' );?>">
						</div>
					</form>
				</div>
			<?php } else { ?>
				<div class="latestnews-box">
					<h2><?php esc_html_e( 'Manual Configuration', 'latestnews' ); ?></h2>
					<p><?php echo sprintf( esc_html__( 'An latestnews API key has been defined in the %s file for this site.', 'latestnews' ), '<code>wp-config.php</code>' ); ?></p>
				</div>
			<?php } ?>
		</div>
	</div>
</div>